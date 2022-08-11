const listHelper = require( '../utils/list_helper' )

test( 'dummy return one', () => {
  const transactions = []

  const result = listHelper.dummy( transactions )
  expect(result).toBe(1)
})