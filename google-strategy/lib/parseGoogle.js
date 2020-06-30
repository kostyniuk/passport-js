module.exports = (profile) => {
  const { provider } = profile;
  const providerId = profile.id;
  console.log({providerId})
  const fullName = profile.displayName;
  const email = profile.emails[0].value;
  const pictrure = Object.values(profile.photos)[0].value;
  return {
    username: email,
    provider,
    providerId,
    fullName,
    email,
    pictrure,
  };
};
