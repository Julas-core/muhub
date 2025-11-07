import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Material, MaterialCard } from './MaterialCard';
import { Skeleton } from './ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface RelatedMaterialsProps {
  currentMaterialId: string;
  course: string;
  department: string;
}

export const RelatedMaterials = ({ currentMaterialId, course, department }: RelatedMaterialsProps) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      
      // First try to find materials from the same course
      let { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('course', course)
        .neq('id', currentMaterialId)
        .order('download_count', { ascending: false })
        .limit(6);

      // If not enough materials from same course, get from same department
      if (!error && data && data.length < 3) {
        const { data: deptData } = await supabase
          .from('materials')
          .select('*')
          .eq('department', department)
          .neq('id', currentMaterialId)
          .neq('course', course)
          .order('download_count', { ascending: false })
          .limit(6 - (data?.length || 0));
        
        if (deptData) {
          data = [...(data || []), ...deptData];
        }
      }

      setMaterials(data || []);
      setLoading(false);
    };

    fetchRelated();
  }, [currentMaterialId, course, department]);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('related-materials-scroll');
    if (container) {
      const scrollAmount = 350;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Related Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (materials.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Related Materials</h2>
        {materials.length > 3 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollContainer('left')}
              disabled={scrollPosition === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollContainer('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div 
        id="related-materials-scroll"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-4"
      >
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
};