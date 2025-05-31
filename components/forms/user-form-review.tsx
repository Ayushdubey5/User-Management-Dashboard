"use client";

import { UserFormData } from '@/types/user';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, Phone, Mail, Loader2 } from 'lucide-react';

type ReviewProps = {
  data: UserFormData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export function UserFormReview({ data, onSubmit, onBack, isSubmitting }: ReviewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Review Information</h2>
        <p className="text-sm text-muted-foreground">
          Please review the information below before submitting.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">{data.name}</div>
                <div className="text-sm text-muted-foreground">Full Name</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">{data.email}</div>
                <div className="text-sm text-muted-foreground">Email Address</div>
              </div>
            </div>
            {data.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">{data.phone}</div>
                  <div className="text-sm text-muted-foreground">Phone Number</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">{data.street}</div>
                <div className="text-sm text-muted-foreground">Street Address</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5" /> {/* Spacer to align with icon above */}
              <div className="space-y-1">
                <div className="font-medium">{data.city}</div>
                <div className="text-sm text-muted-foreground">City</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5" /> {/* Spacer to align with icon above */}
              <div className="space-y-1">
                <div className="font-medium">{data.zipcode}</div>
                <div className="text-sm text-muted-foreground">Zip Code</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Previous Step
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
}