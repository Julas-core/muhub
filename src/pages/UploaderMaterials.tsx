import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MaterialCard, Material } from "@/components/MaterialCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Star, Download } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

export default function UploaderMaterials() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ uploads: 0, downloads: 0, avgRating: 0, totalPoints: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUploaderData = async () => {
      setLoading(true);
      
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      setProfile(profileData);

      // Fetch materials
      const { data: materialsData } = await supabase
        .from("materials")
        .select("*")
        .eq("uploaded_by_user_id", userId)
        .order("created_at", { ascending: false });

      setMaterials(materialsData || []);

      // Calculate stats
      if (materialsData) {
        const totalDownloads = materialsData.reduce((sum, m) => sum + (m.download_count || 0), 0);
        
        // Get average rating
        const materialIds = materialsData.map(m => m.id);
        const { data: ratingsData } = await supabase
          .from("ratings")
          .select("rating")
          .in("material_id", materialIds);

        const avgRating = ratingsData && ratingsData.length > 0
          ? ratingsData.reduce((sum, r) => sum + r.rating, 0) / ratingsData.length
          : 0;

        // Get total points
        const { data: pointsData } = await supabase
          .from("user_points")
          .select("total_points")
          .eq("user_id", userId)
          .single();

        setStats({
          uploads: materialsData.length,
          downloads: totalDownloads,
          avgRating: Math.round(avgRating * 10) / 10,
          totalPoints: pointsData?.total_points || 0,
        });
      }

      setLoading(false);
    };

    fetchUploaderData();
  }, [userId]);

  if (loading) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Uploader not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${profile.full_name || "User"}'s Materials - MU Study Hub`}
        description={`Browse all study materials uploaded by ${profile.full_name || "this user"}`}
      />
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Uploader Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-6 flex-col sm:flex-row">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name?.charAt(0) || profile.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">
                  {profile.full_name || "Anonymous User"}
                </CardTitle>
                {profile.department && (
                  <Badge variant="secondary" className="mb-3">
                    {profile.department}
                  </Badge>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Upload className="h-4 w-4" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stats.uploads}</div>
                      <div className="text-xs">Uploads</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stats.downloads}</div>
                      <div className="text-xs">Downloads</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stats.avgRating}</div>
                      <div className="text-xs">Avg Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge variant="default" className="h-8 px-3">
                      {stats.totalPoints} pts
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Materials Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            All Materials ({materials.length})
          </h2>
          {materials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No materials uploaded yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}