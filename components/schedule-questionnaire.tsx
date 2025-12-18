"use client"

import { useState } from "react"
import { X, CheckCircle, AlertCircle } from "lucide-react"

interface ScheduleQuestionnaireProps {
  onClose: () => void
  onSubmit: (data: ScheduleData) => void
}

export interface ScheduleData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  pestIssue: string
  urgency: string
  preferredContact: string
}

export function ScheduleQuestionnaire({ onClose, onSubmit }: ScheduleQuestionnaireProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ScheduleData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    pestIssue: "",
    urgency: "routine",
    preferredContact: "phone",
  })
  const [areaError, setAreaError] = useState<string | null>(null)

  const validateServiceArea = (city: string, state: string, zip: string): boolean => {
    const serviceCities = [
      // Washington County, UT
      "st george",
      "st. george",
      "hurricane",
      "ivins",
      "santa clara",
      "washington",
      "laverkin",
      "leeds",
      "toquerville",
      // Iron County, UT
      "cedar city",
      "enoch",
      "parowan",
      "brian head",
      // Clark County, NV
      "mesquite",
      "bunkerville",
      "moapa valley",
    ]

    const normalizedCity = city.toLowerCase().trim()
    const normalizedState = state.toLowerCase().trim()

    // Check if city is in service area
    const cityMatch = serviceCities.includes(normalizedCity)

    // Check state
    const stateMatch = normalizedState === "utah" || normalizedState === "ut" ||
                      normalizedState === "nevada" || normalizedState === "nv"

    // Check ZIP codes for service areas
    const zipNum = parseInt(zip)
    const zipMatch =
      (zipNum >= 84770 && zipNum <= 84790) || // Washington County, UT
      (zipNum >= 84720 && zipNum <= 84721) || // Cedar City area
      (zipNum >= 89027 && zipNum <= 89029)    // Mesquite area

    return (cityMatch && stateMatch) || zipMatch
  }

  const handleNext = () => {
    // Validate service area on step 2
    if (step === 2) {
      const isInArea = validateServiceArea(formData.city, formData.state, formData.zip)

      if (!isInArea) {
        setAreaError(
          `We're sorry, but we don't currently service ${formData.city}, ${formData.state}. We serve Washington County & Iron County in Utah, and Mesquite, NV. Would you like us to recommend a local pest control company in your area?`
        )
        return
      }
      setAreaError(null)
    }

    if (step < 4) {
      setStep(step + 1)
    } else {
      onSubmit(formData)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setAreaError(null)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white">Schedule Service 🕷️</h2>
          <p className="text-white/90 text-sm mt-1">Let's get you pest-free!</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-[#16a34a]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Step {step} of 4
          </p>
        </div>

        {/* Area Error */}
        {areaError && (
          <div className="mx-6 mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Outside Service Area</p>
              <p className="text-xs text-amber-700 mt-1">{areaError}</p>
            </div>
          </div>
        )}

        {/* Form Steps */}
        <div className="p-6">
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Contact Information</h3>
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  placeholder="(435) 256-6391"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Service Address</h3>
              <div>
                <label className="block text-sm font-medium mb-1.5">Street Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  placeholder="946 W Sunset Blvd"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                    placeholder="St. George"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                    required
                  >
                    <option value="">Select</option>
                    <option value="UT">Utah</option>
                    <option value="NV">Nevada</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">ZIP Code *</label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  placeholder="84770"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Pest Issue */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tell Us About Your Pest Problem</h3>
              <div>
                <label className="block text-sm font-medium mb-1.5">What pest are you dealing with? *</label>
                <select
                  value={formData.pestIssue}
                  onChange={(e) => setFormData({ ...formData, pestIssue: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  required
                >
                  <option value="">Select pest type</option>
                  <option value="Scorpions">Scorpions</option>
                  <option value="Spiders">Spiders (Black Widow, etc.)</option>
                  <option value="Ants">Ants</option>
                  <option value="Cockroaches">Cockroaches</option>
                  <option value="Rodents">Rodents (Mice/Rats)</option>
                  <option value="Termites">Termites</option>
                  <option value="Bed Bugs">Bed Bugs</option>
                  <option value="Mosquitoes">Mosquitoes</option>
                  <option value="Multiple">Multiple pests</option>
                  <option value="Not sure">Not sure / General inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">How urgent is this? *</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all"
                  required
                >
                  <option value="routine">Routine - Within a week</option>
                  <option value="soon">Soon - Within 2-3 days</option>
                  <option value="urgent">Urgent - Today or tomorrow</option>
                  <option value="emergency">Emergency - Right now!</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-[#16a34a]" />
                <h3 className="font-semibold text-lg">Almost Done!</h3>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Preferred Contact Method *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      value="phone"
                      checked={formData.preferredContact === "phone"}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="text-[#16a34a] focus:ring-[#16a34a]"
                    />
                    <span className="text-sm">Phone Call</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      value="text"
                      checked={formData.preferredContact === "text"}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="text-[#16a34a] focus:ring-[#16a34a]"
                    />
                    <span className="text-sm">Text Message</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      value="email"
                      checked={formData.preferredContact === "email"}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="text-[#16a34a] focus:ring-[#16a34a]"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                </div>
              </div>

              <div className="bg-[#16a34a]/10 border border-[#16a34a]/20 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium text-[#15803d] mb-2">✅ What happens next:</p>
                <ul className="text-xs text-gray-700 space-y-1.5">
                  <li>• We'll contact you within 1 hour (during business hours)</li>
                  <li>• Free inspection scheduled at your convenience</li>
                  <li>• First service: $39.95 with signed agreement</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.name || !formData.phone)) ||
                (step === 2 && (!formData.address || !formData.city || !formData.state || !formData.zip)) ||
                (step === 3 && (!formData.pestIssue || !formData.urgency))
              }
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 4 ? "Schedule Service" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
