import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
}

export const SocialShare = ({ title, description = "", url }: SocialShareProps) => {
  const { toast } = useToast();
  const shareUrl = url || window.location.href;
  const shareText = `${title}${description ? ` - ${description}` : ""}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, "_blank", "width=600,height=400");
  };

  const shareViaEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.location.href = emailUrl;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button
        variant="outline"
        size="icon"
        onClick={shareOnFacebook}
        title="Share on Facebook"
        className="h-8 w-8"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareOnTwitter}
        title="Share on Twitter"
        className="h-8 w-8"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareOnLinkedIn}
        title="Share on LinkedIn"
        className="h-8 w-8"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareViaEmail}
        title="Share via Email"
        className="h-8 w-8"
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        title="Copy link"
        className="h-8 w-8"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
