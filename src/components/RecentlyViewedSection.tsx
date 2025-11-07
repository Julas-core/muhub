import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MaterialCard, Material } from './MaterialCard';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronDown, Clock } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { formatDistanceToNow } from 'date-fns';

interface RecentlyViewedSectionProps {
  userId: string | undefined;
}

export const RecentlyViewedSection = ({ userId }: RecentlyViewedSectionProps) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewTimestamps, setViewTimestamps] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchRecentlyViewed = async () => {
      // Get last 5 unique recently viewed materials with timestamps
      const { data: recentViews } = await supabase
        .from('recently_viewed')
        .select('material_id, viewed_at')
        .eq('user_id', userId)
        .order('viewed_at', { ascending: false })
        .limit(20);

      if (recentViews && recentViews.length > 0) {
        // Get unique material IDs (most recent first) and store their timestamps
        const uniqueViews = new Map<string, string>();
        recentViews.forEach(v => {
          if (!uniqueViews.has(v.material_id)) {
            uniqueViews.set(v.material_id, v.viewed_at);
          }
        });
        
        const uniqueMaterialIds = Array.from(uniqueViews.keys()).slice(0, 5);
        const timestamps: Record<string, string> = {};
        uniqueMaterialIds.forEach(id => {
          timestamps[id] = uniqueViews.get(id) || '';
        });
        setViewTimestamps(timestamps);

        // Fetch material details
        const { data: materialsData } = await supabase
          .from('materials')
          .select('*')
          .in('id', uniqueMaterialIds);

        if (materialsData) {
          // Sort materials by the order they appear in uniqueMaterialIds
          const sortedMaterials = uniqueMaterialIds
            .map(id => materialsData.find(m => m.id === id))
            .filter(m => m !== undefined) as Material[];
          
          setMaterials(sortedMaterials);
        }
      }
      setLoading(false);
    };

    fetchRecentlyViewed();
  }, [userId]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!userId) return null;

  if (loading) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors w-full">
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          Recently Viewed
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="relative mt-4">
            <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar" ref={containerRef}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-shrink-0 w-72">
                  <div className="bg-muted rounded-lg h-48 w-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (materials.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors w-full">
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        Recently Viewed
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="relative mt-4">
          <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar" ref={containerRef}>
            {materials.map((material) => (
              <div key={material.id} className="flex-shrink-0 w-72">
                <div className="space-y-2">
                  <MaterialCard material={material} />
                  {viewTimestamps[material.id] && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground px-2">
                      <Clock className="h-3 w-3" />
                      <span>
                        Viewed {formatDistanceToNow(new Date(viewTimestamps[material.id]), { addSuffix: true })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {materials.length > 2 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -right-3 transform -translate-y-1/2 rounded-full h-8 w-8"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -left-3 transform -translate-y-1/2 rounded-full h-8 w-8"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
