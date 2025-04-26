import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Video, CalendarDays, Clock } from 'lucide-react';
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { QuoteFormData, QuotePrice } from '@/types/quote';
import useScrollToTop from '@/hooks/useScrollToTop';
import { calculateQuotePrice } from '@/utils/pricing';
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  formData: QuoteFormData;
  quotePrice: QuotePrice;
}

const QuoteConfirmation = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteFormData>(() => 
    (location.state as LocationState)?.formData || null
  );
  const [quotePrice, setQuotePrice] = useState<QuotePrice>(() => 
    (location.state as LocationState)?.quotePrice || null
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

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

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Scheduled!",
      description: `Your video consultation is scheduled for ${format(selectedDate, "EEEE, MMMM d")} at ${selectedTime}. You will receive a calendar invite shortly.`,
    });
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
              <h2 className="text-2xl font-bold mb-3">Schedule Your Video Consultation</h2>
              <p className="text-lg text-conneqt-slate">
                Let's discuss your requirements in detail and create a tailored solution for your business
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Preferred Time</CardTitle>
                  <CardDescription>Choose a date and time that works best for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            "Select a date"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date < new Date("2024-05-01")}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Select onValueChange={setSelectedTime} value={selectedTime}>
                      <SelectTrigger className="w-full">
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-conneqt-blue hover:bg-blue-500"
                    disabled={!selectedDate || !selectedTime}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
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
