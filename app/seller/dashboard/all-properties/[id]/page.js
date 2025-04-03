import { connectToMongoDB } from '@/lib/database'
import Property from '@/app/models/properties'
import Division from '@/app/models/Division'
import SellerNavbarComp from '@/app/components/SellerNavbar'
import Image from 'next/image'
import FooterSection from '@/app/components/Footer'

export default async function AllPropertyDetails({ params }) {
  const { id } = params
  await connectToMongoDB()

  const property = await Property.findById(id)
    .populate('district')
    .lean()
    .exec()

  if (!property) {
    return <p className="text-xl text-gray-600 font-bold">Property not found</p>
  }

  const divisions = await Division.find().lean().exec()

  const division = divisions.find(
    (d) => d._id.toString() === property.division.toString(),
  )

  const propertyWithDetails = {
    ...property,
    division: division ? { name: division.name } : { name: 'N/A' },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-50">
      <SellerNavbarComp />

      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg">
          <div className="relative w-full h-64 sm:h-96 mb-8">
            {propertyWithDetails.image ? (
              <Image
                src={propertyWithDetails.image}
                alt={propertyWithDetails.propertyTitle}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full rounded-md"></div>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            {propertyWithDetails.propertyTitle}
          </h1>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              {propertyWithDetails.propertyType} -{' '}
              <span className="font-bold">
                {propertyWithDetails.price.toLocaleString()} BDT
              </span>
            </p>
            <p className="text-gray-600 text-lg sm:text-xl mb-4">
              <strong>Description :</strong> {propertyWithDetails.description}
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-lg">
                <strong>Bedrooms:</strong> {propertyWithDetails.bedrooms}
              </p>
              <p className="text-lg">
                <strong>Bathrooms:</strong> {propertyWithDetails.bathrooms}
              </p>
              <p className="text-lg">
                <strong>Total Area :</strong> {propertyWithDetails.totalArea}{' '}
                sqft
              </p>
              <p className="text-lg">
                <strong>Year Built:</strong> {propertyWithDetails.yearBuilt}
              </p>
              <p className="text-lg">
                <strong>Location:</strong> {propertyWithDetails.address},{' '}
                {propertyWithDetails.district.name},{' '}
                {propertyWithDetails.division.name}
              </p>
              <p className="text-lg">
                <strong>ZIP/Postal Code:</strong>{' '}
                {propertyWithDetails.zipPostalCode}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>
                <strong>CCTV:</strong>{' '}
                {propertyWithDetails.amenities.cctv ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Gym:</strong>{' '}
                {propertyWithDetails.amenities.gym ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Security:</strong>{' '}
                {propertyWithDetails.amenities.security ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Pool:</strong>{' '}
                {propertyWithDetails.amenities.pool ? 'Yes' : 'No'}
              </li>
            </ul>
            <p className="text-lg mt-4">
              <strong>Parking Availability:</strong>{' '}
              {propertyWithDetails.parkingAvailability}
            </p>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
