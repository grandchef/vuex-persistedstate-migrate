import createMigrate from '../src'

describe('migrate state', () => {

  it('first migration', () => {
    const migrations = [
      {
        version: 1,
        up: state => {
          return {
            ...state,
            myModule: {
              ...state.myModule,
              myProperty: 'migrated value',
            }
          }
        }
      }
    ]
    const state = {
      myModule: {
        myProperty: 'old value',
      },
    }
    const newState = createMigrate(migrations, 'migration.version')('vuex', {
      getItem: () => JSON.stringify(state)
    })

    expect(newState.myModule.myProperty).toBe('migrated value')
    expect(newState.migration.version).toBe(1)
  })

  it('ignore migrated', () => {
    const migrations = [
      {
        version: 1,
        up: state => {
          return {
            ...state,
            myModule: {
              ...state.myModule,
              myProperty: 'migrated value',
            }
          }
        }
      },
      {
        version: 2,
        up: state => {
          return {
            ...state,
            myModule: {
              ...state.myModule,
              otherProperty: 'other value',
            }
          }
        }
      }
    ]
    const state = {
      myModule: {
        myProperty: 'old value',
      },
      migration: {
        version: 1,
      }
    }
    const newState = createMigrate(migrations, 'migration.version')('vuex', {
      getItem: () => JSON.stringify(state)
    })

    expect(newState.myModule.myProperty).toBe('old value')
    expect(newState.myModule.otherProperty).toBe('other value')
    expect(newState.migration.version).toBe(2)
  })
})
