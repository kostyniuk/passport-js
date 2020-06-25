module.exports = (profile) => {
  const { provider } = profile;
  const providerId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;
  const pictrure = Object.values(profile.photos)[0].value;
  return {
    provider,
    providerId,
    name,
    email,
    pictrure,
  };
};
