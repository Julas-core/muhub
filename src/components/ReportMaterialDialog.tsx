import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Flag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ReportMaterialDialogProps {
  materialId: string;
}

export const ReportMaterialDialog = ({ materialId }: ReportMaterialDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>("wrong_content");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    { value: "wrong_content", label: "Wrong Content", description: "Content doesn't match title/description" },
    { value: "spam", label: "Spam", description: "Irrelevant or promotional content" },
    { value: "copyright_violation", label: "Copyright Violation", description: "Copyrighted material shared without permission" },
    { value: "inappropriate", label: "Inappropriate", description: "Offensive or inappropriate content" },
    { value: "other", label: "Other", description: "Other issues not listed above" },
  ];

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to report materials");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("material_reports")
        .insert({
          material_id: materialId,
          reporter_user_id: user.id,
          reason,
          description: description.trim() || null,
        });

      if (error) throw error;

      toast.success("Report submitted successfully. Our team will review it soon.");
      setOpen(false);
      setReason("wrong_content");
      setDescription("");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Flag className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Report Material</DialogTitle>
          <DialogDescription>
            Help us maintain quality by reporting inappropriate or incorrect materials.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label>Reason for reporting</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reasons.map((r) => (
                <div key={r.value} className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value={r.value} id={r.value} />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor={r.value}
                      className="font-medium cursor-pointer"
                    >
                      {r.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Additional details (optional)</Label>
            <Textarea
              id="description"
              placeholder="Please provide more context about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};