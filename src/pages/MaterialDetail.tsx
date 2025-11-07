import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CommentsSection } from '@/components/CommentsSection';
import { RelatedMaterials } from '@/components/RelatedMaterials';
import { SocialShare } from '@/components/SocialShare';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Calendar, User, FileText, Eye, Bookmark, Upload, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useRatings } from '@/hooks/useRatings';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { StarRating } from '@/components/StarRating';
import { useToast } from '@/hooks/use-toast';
import { trackDownload } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [material, setMaterial] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploaderInfo, setUploaderInfo] = useState<any>(null);
  const [uploaderStats, setUploaderStats] = useState({ uploads: 0, points: 0 });

  const { bookmarks, toggleBookmark } = useBookmarks(user?.id);
  const { stats, userRating, submitRating } = useRatings(id || '', user?.id);
  useRecentlyViewed(id || '', user?.id);

  const isBookmarked = id ? bookmarks.has(id) : false;

  useEffect(() => {
    const fetchMaterial = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setMaterial(data);
        
        // Fetch uploader info
        if (data.uploaded_by_user_id) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, avatar_url')
            .eq('id', data.uploaded_by_user_id)
            .maybeSingle();

          const { data: role } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.uploaded_by_user_id)
            .maybeSingle();

          // Get upload count
          const { count: uploadCount } = await supabase
            .from('materials')
            .select('*', { count: 'exact', head: true })
            .eq('uploaded_by_user_id', data.uploaded_by_user_id);

          // Get points
          const { data: pointsData } = await supabase
            .from('user_points')
            .select('total_points')
            .eq('user_id', data.uploaded_by_user_id)
            .maybeSingle();

          setUploaderInfo({
            ...profile,
            role: role?.role,
            isAdmin: role?.role === 'admin'
          });
          
          setUploaderStats({
            uploads: uploadCount || 0,
            points: pointsData?.total_points || 0
          });
        }
      }
      setLoading(false);
    };

    fetchMaterial();
  }, [id]);

  const handleDownload = async () => {
    if (!material) return;

    try {
      const { data, error } = await supabase.storage
        .from('course-materials')
        .download(material.file_path);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = material.file_path.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Increment download count
      await supabase.rpc('increment_download_count', {
        p_material_id: material.id
      });

      // Award points
      if (user?.id) {
        await supabase.rpc('award_points', {
          p_user_id: user.id,
          p_points: 2,
          p_action_type: 'download',
          p_reference_id: material.id,
        });
      }

      if (material.uploaded_by_user_id) {
        await supabase.rpc('award_points', {
          p_user_id: material.uploaded_by_user_id,
          p_points: 10,
          p_action_type: 'material_downloaded',
          p_reference_id: material.id,
        });
      }

      toast({
        title: 'Download started',
        description: user?.id ? 'Your file is downloading... +2 points' : 'Your file is downloading...',
      });
      
      trackDownload(material.title, material.file_type);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Download failed',
        description: error.message || 'Failed to download file',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!material) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="p-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">Material not found</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const uploaderDisplayName = uploaderInfo?.isAdmin 
    ? 'Admin' 
    : uploaderInfo?.full_name || uploaderInfo?.email || material.uploaded_by || 'Unknown';

  return (
    <>
      <SEOHead
        title={`${material.title} - MU Study Hub`}
        description={material.description || `Download ${material.title} from ${material.course} course`}
        type="article"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Material Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {material.file_type}
                    </Badge>
                    <Badge variant="outline">{material.file_size}</Badge>
                    {material.material_type === 'exam' && (
                      <>
                        {material.exam_year && <Badge variant="secondary">{material.exam_year}</Badge>}
                        {material.exam_semester && <Badge variant="secondary">{material.exam_semester}</Badge>}
                      </>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => id && toggleBookmark(id)}
                    className={cn(isBookmarked && "text-primary")}
                  >
                    <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
                  </Button>
                </div>
                
                <CardTitle className="text-3xl mb-4">{material.title}</CardTitle>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="border-primary/20 text-primary text-base px-3 py-1">
                    {material.course}
                  </Badge>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {material.department}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {material.material_type === 'exam' ? 'Past Exam' : 'Study Material'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description */}
                {material.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{material.description}</p>
                  </div>
                )}

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{material.download_count || 0}</p>
                      <p className="text-sm text-muted-foreground">Downloads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                      <p className="text-sm text-muted-foreground">{stats.totalRatings} Ratings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Uploaded</p>
                      <p className="text-xs text-muted-foreground">{formatDate(material.created_at)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Rating Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Rate this material</h3>
                  <div className="flex items-center gap-4">
                    <StarRating rating={stats.averageRating} size={24} />
                    <span className="text-sm text-muted-foreground">
                      {stats.averageRating > 0 ? `${stats.averageRating.toFixed(1)} out of 5 stars` : 'No ratings yet'}
                    </span>
                  </div>
                  {user && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Your rating:</span>
                      <StarRating
                        rating={userRating || 0}
                        size={28}
                        interactive
                        onRatingChange={submitRating}
                        userRating={userRating}
                      />
                    </div>
                  )}
                  {!user && (
                    <p className="text-sm text-muted-foreground">Sign in to rate this material</p>
                  )}
                </div>

                <Separator />

                {/* Download Button */}
                <Button 
                  onClick={handleDownload}
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Material
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Uploader Info & Actions */}
          <div className="space-y-6">
            {/* Uploader Card */}
            {uploaderInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Uploaded by</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={uploaderInfo.avatar_url} />
                      <AvatarFallback>
                        {uploaderDisplayName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{uploaderDisplayName}</p>
                      {uploaderInfo.isAdmin && (
                        <Badge variant="destructive" className="text-xs">Admin</Badge>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Uploads</span>
                      <span className="font-semibold">{uploaderStats.uploads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reputation Points</span>
                      <span className="font-semibold">{uploaderStats.points}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Share */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialShare 
                  url={window.location.href}
                  title={material.title}
                  description={material.description || ''}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Materials */}
        <RelatedMaterials 
          currentMaterialId={material.id}
          course={material.course}
          department={material.department}
        />

        {/* Comments Section */}
        <CommentsSection materialId={material.id} />
      </div>
    </>
  );
};

export default MaterialDetail;