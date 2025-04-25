
import { QuoteFormData } from '@/types/quote';

interface ServiceRequirementsProps {
  formData: QuoteFormData;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ServiceRequirements = ({ formData, onChange }: ServiceRequirementsProps) => (
  <div className="space-y-5">
    <div>
      <label htmlFor="serviceType" className="block text-sm font-medium text-conneqt-slate mb-1">
        Service Type*
      </label>
      <select
        id="serviceType"
        name="serviceType"
        value={formData.serviceType}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      >
        <option value="">Select a service</option>
        <option value="customer-support">Multilingual Customer Support</option>
        <option value="device-monitoring">Device Monitoring & Notifications</option>
        <option value="emergency-calling">Emergency & Welfare Calling</option>
        <option value="crm-data">CRM & Data Management</option>
        <option value="ai-guardian">AI Guardian Assistant</option>
        <option value="subscription">Platform Subscription Only</option>
      </select>
    </div>
    
    <div>
      <label htmlFor="hoursPerDay" className="block text-sm font-medium text-conneqt-slate mb-1">
        Hours Per Day*
      </label>
      <select
        id="hoursPerDay"
        name="hoursPerDay"
        value={formData.hoursPerDay}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      >
        <option value="">Select hours</option>
        <option value="8">8 hours</option>
        <option value="12">12 hours</option>
        <option value="24">24 hours (24/7)</option>
      </select>
    </div>
    
    <div>
      <label htmlFor="daysPerWeek" className="block text-sm font-medium text-conneqt-slate mb-1">
        Days Per Week*
      </label>
      <select
        id="daysPerWeek"
        name="daysPerWeek"
        value={formData.daysPerWeek}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      >
        <option value="">Select days</option>
        <option value="5">5 days (Mon-Fri)</option>
        <option value="6">6 days</option>
        <option value="7">7 days</option>
      </select>
    </div>
    
    <div>
      <label htmlFor="language" className="block text-sm font-medium text-conneqt-slate mb-1">
        Primary Language*
      </label>
      <select
        id="language"
        name="language"
        value={formData.language}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      >
        <option value="">Select language</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="nl">Dutch</option>
        <option value="multiple">Multiple Languages</option>
      </select>
    </div>
  </div>
);
