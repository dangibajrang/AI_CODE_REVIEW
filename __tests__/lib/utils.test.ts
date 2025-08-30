import { cn } from '@/lib/utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('should handle falsy values', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class')
    })

    it('should handle empty strings and undefined', () => {
      const result = cn('base-class', '', undefined, null, false)
      expect(result).toBe('base-class')
    })

    it('should handle arrays', () => {
      const result = cn('base-class', ['class1', 'class2'])
      expect(result).toBe('base-class class1 class2')
    })
  })
})

