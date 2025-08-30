import { render, screen } from '@testing-library/react'
import { CodeReview } from '@/components/code-review'

describe('CodeReview', () => {
  it('renders without crashing', () => {
    render(<CodeReview review="" />)
    expect(screen.getByText('💖 Code Review')).toBeInTheDocument()
  })

  it('shows placeholder when no review is provided', () => {
    render(<CodeReview review="" />)
    expect(screen.getByText('Click "Review File" to analyze this file')).toBeInTheDocument()
  })

  it('renders review content when provided', () => {
    const mockReview = '# Code Review\n\nThis is a test review with **markdown** content.'
    render(<CodeReview review={mockReview} />)
    
    expect(screen.getByText('Code Review')).toBeInTheDocument()
    expect(screen.getByText(/This is a test review with/)).toBeInTheDocument()
    expect(screen.getByText('markdown')).toBeInTheDocument()
  })

  it('handles markdown content correctly', () => {
    const mockReview = `
# Security Issues
- **Line 15**: Potential SQL injection vulnerability
- **Line 23**: Missing input validation

# Performance
- **Line 8**: Consider memoizing this function
    `
    render(<CodeReview review={mockReview} />)
    
    expect(screen.getByText('Security Issues')).toBeInTheDocument()
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText(/Potential SQL injection vulnerability/)).toBeInTheDocument()
  })
})
