"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserFormData } from '@/types/user';
import { addUser } from '@/lib/api';
import { UserFormStep1 } from '@/components/forms/user-form-step1';
import { UserFormStep2 } from '@/components/forms/user-form-step2';
import { UserFormReview } from '@/components/forms/user-form-review';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'user-form-data';

const initialFormData: UserFormData = {
  name: '',
  email: '',
  street: '',
  city: '',
  zipcode: '',
  phone: ''
};

export default function AddUserPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Load form data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<UserFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Format the user data to match the API structure
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        address: {
          street: formData.street,
          city: formData.city,
          zipcode: formData.zipcode,
        }
      };

      // Log the data to console as required
      console.log('Submitting user data:', userData);
      
      // Call the API
      await addUser(userData);
      
      // Show success message
      toast({
        title: "Success!",
        description: "User has been added successfully.",
      });
      
      // Clear form data from localStorage
      localStorage.removeItem(STORAGE_KEY);
      
      // Reset form and go back to first step or redirect to dashboard
      setFormData(initialFormData);
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserFormStep1 data={formData} updateData={updateFormData} onNext={handleNext} />;
      case 2:
        return <UserFormStep2 data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <UserFormReview data={formData} onSubmit={handleSubmit} onBack={handleBack} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader 
        title="Add New User" 
        description="Add a new user to the system"
        action={
          <Link href="/dashboard">
<Button variant="outline" size="sm" className="gap-2">

              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        }
      />
      
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep === step 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStep > step 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {step}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">
                  {step === 1 ? 'Basic Info' : step === 2 ? 'Address' : 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-[2px] w-full bg-muted -translate-y-1/2"></div>
            <div 
              className="absolute left-0 top-1/2 h-[2px] bg-primary -translate-y-1/2 transition-all duration-300 ease-in-out" 
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="w-full">
          <CardContent className="pt-6">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </>
  );
}