interface IMigration {
  version: Number;
  up: (state: any) => any;
}

function migrate(state: any, versionPath: string, migrations: IMigration[]) {
  let newState = { ...state };
  let { version: currentVersion } = versionPath.split('.').reduce(
    (data: any, key: string) => {
      const obj = data.obj && data.obj[key];
      const version = (data.obj && data.obj[key]) || data.version;
      return { obj, version };
    },
    { version: 0, obj: newState },
  );

  migrations.forEach(({ up, version }: IMigration) => {
    if (version <= currentVersion) {
      return;
    }
    newState = up(newState);
    versionPath.split('.').reduce((state, key, index, array) => {
      const isLastKey = index === array.length - 1;
      state[key] = isLastKey ? version : { ...state[key] };
      return state[key];
    }, newState);
  });
  return newState;
}

const createMigrate = (migrations: IMigration[], versionPath: string) => (
  key: string,
  storage: any,
) => {
  const value = storage.getItem(key);
  if (typeof value === undefined) {
    return undefined;
  }
  try {
    const state = JSON.parse(value);
    return migrate(state, versionPath, migrations);
  } catch (err) {
    console.log(err);
    return JSON.parse(value);
  }
};

export { IMigration, createMigrate };

export default createMigrate;
