import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MaterialCard } from './MaterialCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export const TrendingMaterials = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTrending = async () => {
      // Get materials with highest download count in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data } = await supabase
        .from('materials')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('download_count', { ascending: false })
        .limit(5); // Updated to show up to 5 materials

      if (data) {
        setMaterials(data);
      }
      setLoading(false);
    };

    fetchTrending();
  }, [user]);

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

  // Don't show to new/non-logged-in users
  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors w-full">
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          🔥 Trending This Week
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="relative mt-4">
            <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar" ref={containerRef}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-shrink-0 w-72">
                  <Skeleton className="h-48 w-full" />
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (materials.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors w-full">
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        🔥 Trending This Week
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="relative mt-4">
          <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar" ref={containerRef}>
            {materials.map((material) => (
              <div key={material.id} className="flex-shrink-0 w-72">
                <MaterialCard material={material} />
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
