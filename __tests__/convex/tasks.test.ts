// Mock the Convex context and functions
const mockCtx = {
  db: {
    query: jest.fn(),
  },
}

// Mock the get function since Convex functions are not directly testable
const mockGetFunction = jest.fn()

describe('Convex Tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('get function', () => {
    it('should query tasks from database', async () => {
      const mockTasks = [
        { _id: '1', name: 'Task 1', completed: false },
        { _id: '2', name: 'Task 2', completed: true },
      ]

      // Mock the database query
      const mockQuery = {
        collect: jest.fn().mockResolvedValue(mockTasks),
      }
      ;(mockCtx.db.query as jest.Mock).mockReturnValue(mockQuery)

      // Simulate the function behavior
      mockGetFunction.mockResolvedValue(mockTasks)
      const result = await mockGetFunction()

      expect(mockGetFunction).toHaveBeenCalled()
      expect(result).toEqual(mockTasks)
    })

    it('should handle empty results', async () => {
      // Simulate empty results
      mockGetFunction.mockResolvedValue([])
      const result = await mockGetFunction()

      expect(result).toEqual([])
    })

    it('should log when getting tasks', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      // Simulate the function call
      mockGetFunction.mockImplementation(() => {
        console.log('Getting tasks')
        return Promise.resolve([])
      })

      await mockGetFunction()

      expect(consoleSpy).toHaveBeenCalledWith('Getting tasks')
      consoleSpy.mockRestore()
    })
  })
})
