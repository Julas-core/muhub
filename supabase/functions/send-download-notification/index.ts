import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
// @deno-types="npm:@types/node"
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  materialId: string;
  uploaderId: string;
  downloadCount: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { materialId, uploaderId, downloadCount }: NotificationRequest = await req.json();

    console.log("Processing download notification:", { materialId, uploaderId, downloadCount });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get material details
    const { data: material, error: materialError } = await supabase
      .from("materials")
      .select("title, course, department")
      .eq("id", materialId)
      .single();

    if (materialError || !material) {
      console.error("Material not found:", materialError);
      throw new Error("Material not found");
    }

    // Get uploader email
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", uploaderId)
      .single();

    if (profileError || !profile?.email) {
      console.error("Uploader email not found:", profileError);
      throw new Error("Uploader email not found");
    }

    // Only send emails at milestones to prevent spam
    const milestones = [5, 10, 25, 50, 100, 250, 500, 1000];
    if (!milestones.includes(downloadCount)) {
      console.log(`Skipping notification - not a milestone (${downloadCount} downloads)`);
      return new Response(
        JSON.stringify({ success: true, skipped: true, reason: "Not a milestone" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "MU Study Hub <onboarding@resend.dev>",
      to: [profile.email],
      subject: `🎉 Your material reached ${downloadCount} downloads!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Congratulations! 🎉</h1>
          <p>Hi ${profile.full_name || "there"},</p>
          
          <p>Great news! Your study material has reached a significant milestone:</p>
          
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #1f2937;">${material.title}</h2>
            <p style="color: #6b7280; margin: 5px 0;">
              <strong>Course:</strong> ${material.course}<br>
              <strong>Department:</strong> ${material.department}
            </p>
            <p style="font-size: 32px; font-weight: bold; color: #2563eb; margin: 15px 0;">
              ${downloadCount} Downloads
            </p>
          </div>
          
          <p>Thank you for contributing to the MU Study Hub community! Your shared materials are helping fellow students succeed.</p>
          
          <p>Keep up the great work!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>Best regards,<br>The MU Study Hub Team</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-download-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
