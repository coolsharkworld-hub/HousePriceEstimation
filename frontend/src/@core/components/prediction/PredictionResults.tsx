import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import { FiDollarSign, FiHome } from 'react-icons/fi'

interface PredictionResult {
  price: number
  property?: {
    bedrooms?: string
    bathrooms?: string
    sqft_living?: string
    sqft_lot?: string
    floors?: string
    zipcode?: string
  }
}

interface PredictionResultsProps {
  results: PredictionResult[]
  onClose: () => void
}

const PredictionResults = ({ results, onClose }: PredictionResultsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <Box className='p-6'>
      <Typography variant='h5' className='font-semibold mb-6 dark:text-white text-center'>
        Prediction Results ({results.length} properties)
      </Typography>

      <TableContainer component={Paper} className='mb-4 max-h-96 overflow-auto'>
        <Table size='medium' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className='font-bold'>Property</TableCell>
              <TableCell className='font-bold'>Bed/Bath</TableCell>
              <TableCell className='font-bold'>Living Area</TableCell>
              <TableCell className='font-bold'>Predicted Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Box className='flex items-center'>
                    <FiHome className='mr-2' />
                    Property {index + 1}
                  </Box>
                </TableCell>
                <TableCell>
                  {result.property?.bedrooms || 'N/A'} bed / {result.property?.bathrooms || 'N/A'} bath
                </TableCell>
                <TableCell>{result.property?.sqft_living ? `${result.property.sqft_living} sqft` : 'N/A'}</TableCell>
                <TableCell className='font-semibold text-green-600'>
                  <Box className='flex items-center'>
                    <FiDollarSign className='mr-1' />
                    {formatPrice(result.price)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {results.length > 0 && (
        <Box className='mt-4 p-4 bg-blue-50 rounded-lg'>
          <Typography variant='body1' className='text-blue-800 dark:text-white font-semibold'>
            Portfolio Summary
          </Typography>
          <Typography variant='body2' className='text-blue-800 mt-1 dark:text-white'>
            <strong>Total Value:</strong> {formatPrice(results.reduce((sum, result) => sum + result.price, 0))}
          </Typography>
          <Typography variant='body2' className='text-blue-800 dark:text-white'>
            <strong>Average Price:</strong>{' '}
            {formatPrice(results.reduce((sum, result) => sum + result.price, 0) / results.length)}
          </Typography>
        </Box>
      )}

      <Button variant='contained' fullWidth onClick={onClose} className='mt-6 py-3'>
        Close Results
      </Button>
    </Box>
  )
}

export default PredictionResults
