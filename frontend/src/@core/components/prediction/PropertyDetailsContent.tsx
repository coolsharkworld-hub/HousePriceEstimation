import { useState } from 'react'
import { Box, Stack, CircularProgress } from '@mui/material'
import Input from 'src/@core/components/input'
import Button from '../button'

export interface PropertyDetails {
  address?: string
  bedrooms: string
  bathrooms: string
  sqft_living: string
  sqft_lot: string
  floors: string
  sqft_above: string
  sqft_basement: string
  yr_built: string
  zipcode: string
}

interface PropertyDetailsContentProps {
  onSave: (data: PropertyDetails) => void
  onClose?: () => void
  isProcessing: boolean
}

const PropertyDetailsContent = ({ onSave, onClose, isProcessing }: PropertyDetailsContentProps) => {
  const [details, setDetails] = useState<PropertyDetails>({
    address: '',
    bedrooms: '',
    bathrooms: '',
    sqft_living: '',
    sqft_lot: '',
    floors: '',
    sqft_above: '',
    sqft_basement: '',
    yr_built: '',
    zipcode: ''
  })

  const handleInputChange =
    (field: keyof PropertyDetails) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDetails(prev => ({
        ...prev,
        [field]: event.target.value
      }))
    }

  const isFormValid = () => {
    return (
      details.bedrooms.trim() !== '' &&
      details.bathrooms.trim() !== '' &&
      details.sqft_living.trim() !== '' &&
      details.sqft_above.trim() !== '' &&
      details.sqft_basement.trim() !== '' &&
      details.yr_built.trim() !== '' &&
      details.zipcode.trim() !== ''
    )
  }

  return (
    <Box className="w-full">
      <Stack spacing={3}>
        {/* Address */}
        <Input
          placeholder="Address (optional)"
          value={details.address}
          onChange={handleInputChange('address')}
          className="w-full bg-white rounded-md"
        />

        {/* Bedrooms & Bathrooms */}
        <Stack direction="row" spacing={2}>
          <Input
            placeholder="Bedrooms *"
            type="number"
            value={details.bedrooms}
            onChange={handleInputChange('bedrooms')}
            required
            className="bg-white rounded-md"
          />
          <Input
            placeholder="Bathrooms *"
            type="number"
            value={details.bathrooms}
            onChange={handleInputChange('bathrooms')}
            required
            className="bg-white rounded-md"
          />
        </Stack>

        {/* Living Area & Lot Size */}
        <Stack direction="row" spacing={2}>
          <Input
            placeholder="Living Area (sqft) *"
            type="number"
            value={details.sqft_living}
            onChange={handleInputChange('sqft_living')}
            required
            className="bg-white rounded-md"
          />
          <Input
            placeholder="Lot Size (sqft)"
            type="number"
            value={details.sqft_lot}
            onChange={handleInputChange('sqft_lot')}
            className="bg-white rounded-md"
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Input
            placeholder="Floors"
            type="number"
            value={details.floors}
            onChange={handleInputChange('floors')}
            className="bg-white rounded-md"
          />
          <Input
            placeholder="Above Ground Area (sqft) *"
            type="number"
            value={details.sqft_above}
            onChange={handleInputChange('sqft_above')}
            required
            className="bg-white rounded-md"
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Input
            placeholder="Basement Area (sqft) *"
            type="number"
            value={details.sqft_basement}
            onChange={handleInputChange('sqft_basement')}
            required
            className="bg-white rounded-md"
          />
          <Input
            placeholder="Year Built *"
            type="number"
            value={details.yr_built}
            onChange={handleInputChange('yr_built')}
            required
            className="bg-white rounded-md"
          />
        </Stack>

        <Input
          placeholder="Zipcode *"
          type="text"
          value={details.zipcode}
          onChange={handleInputChange('zipcode')}
          required
          className="bg-white rounded-md"
        />

        <Stack direction="row" spacing={2} mt={2}>
          {onClose && (
            <Button
              rounded="rounded-full"
              className="px-6 py-2.5"
              fullWidth
              onClick={onClose}
              size="large"
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            rounded="rounded-full"
            fullWidth
            onClick={() => onSave(details)}
            disabled={!isFormValid() || isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
            size="large"
          >
            {isProcessing ? 'Predicting...' : 'Predict Price'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PropertyDetailsContent
