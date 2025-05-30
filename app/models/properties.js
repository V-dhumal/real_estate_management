import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema(
  {
    propertyTitle: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ['House', 'Apartment'],
      required: true,
    },
    price: { type: Number, required:true },
    bedrooms: { type: Number, required:true },
    bathrooms: { type: Number, required:true },
    totalArea: { type: Number, required:true },
    address: { type: String, required: true },
    division: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true,
    },
    zipPostalCode: { type: String, required: true },
    description: { type: String, required: true },
    yearBuilt: { type: Number, required: true },
    amenities: {
      cctv: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      security: { type: Boolean, default: false },
      pool: { type: Boolean, default: false },
    },
    parkingAvailability: { type: String, enum: ['Yes', 'No'], required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: {
      type: String,
      required:true,
    },
  },
  { timestamps: true },
)

const Property =
  mongoose.models.Property || mongoose.model('Property', PropertySchema)
export default Property
