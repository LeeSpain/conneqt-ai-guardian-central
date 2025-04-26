import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Video, CalendarDays, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PriceBreakdown } from '@/components/quote/PriceBreakdown';
import { ServiceRequirements } from '@/components/quote/ServiceRequirements';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { QuoteFormData, QuotePrice } from '@/types/quote';
import useScrollToTop from '@/hooks/useScrollToTop';
import { calculateQuotePrice } from '@/utils/pricing';

interface LocationState {
  formData: QuoteFormData;
  quotePrice: QuotePrice;
}

const QuoteConfirmation = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuoteFormData>(() => 
    (location.state as LocationState)?.formData || null
  );
  const [quotePrice, setQuotePrice] = useState<QuotePrice>(() => 
    (location.state as LocationState)?.quotePrice || null
  );

  useEffect(() => {
    if (!formData || !quotePrice) {
      navigate('/quote');
    }
  }, [formData, quotePrice, navigate]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
    
    // Recalculate quote price when service requirements change
    if (name === 'hoursPerDay' || name === 'daysPerWeek') {
      const newQuotePrice = calculateQuotePrice(
        updatedFormData.hoursPerDay,
        updatedFormData.daysPerWeek
      );
      setQuotePrice(newQuotePrice);
    }
  };

  // Hardcoded available slots - in a real app these would come from an API
  const availableSlots = [
    { date: "Tuesday, May 7", time: "10:00 AM", timezone: "EST" },
    { date: "Wednesday, May 8", time: "2:00 PM", timezone: "EST" },
    { date: "Thursday, May 9", time: "11:00 AM", timezone: "EST" }
  ];

  const handleBooking = (date: string, time: string) => {
    // In a real application, this would integrate with a booking system
    console.log(`Booking appointment for ${date} at ${time}`);
    // For now, we'll just show a success message
    window.alert(`Thank you! We'll send you a calendar invite for your video appointment on ${date} at ${time}`);
  };

  if (!formData || !quotePrice) {
    return null;
  }

  return (
    <>
      <Navbar />
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="mb-4">Thank You for Your Quote Request</h1>
            <p className="text-lg text-conneqt-slate">
              We've sent a copy of this quote to {formData.email}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Quote Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-conneqt-slate">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Company:</span> {formData.company}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Service Requirements</h3>
                <ServiceRequirements formData={formData} onChange={handleServiceChange} />
              </div>
            </div>

            <PriceBreakdown quotePrice={quotePrice} />

            {formData.message && (
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Additional Notes</h3>
                <p className="text-conneqt-slate">{formData.message}</p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button onClick={() => navigate('/')} className="bg-conneqt-blue hover:bg-blue-500">
                Return to Homepage
              </Button>
            </div>
          </div>

          {/* Video Appointment Section */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Ready to Move Forward?</h2>
              <p className="text-lg text-conneqt-slate">
                Schedule a video consultation with our team to discuss your requirements in detail
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {availableSlots.map((slot, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">{slot.date}</CardTitle>
                    <CardDescription>Available Slot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-conneqt-slate">
                        <Clock className="h-4 w-4" />
                        <span>{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-conneqt-slate">
                        <Video className="h-4 w-4" />
                        <span>Video Call</span>
                      </div>
                      <div className="flex items-center gap-2 text-conneqt-slate">
                        <CalendarDays className="h-4 w-4" />
                        <span>{slot.timezone}</span>
                      </div>
                      <Button 
                        onClick={() => handleBooking(slot.date, slot.time)}
                        className="w-full bg-conneqt-blue hover:bg-blue-500"
                      >
                        Book This Slot
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate('/')} className="bg-conneqt-blue hover:bg-blue-500">
              Return to Homepage
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default QuoteConfirmation;
