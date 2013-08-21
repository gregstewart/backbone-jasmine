function fixtureLoader (fixture) {
  if (typeof window.__karma__ !== 'undefined') {
    jasmine.getFixtures().set(window.__html__['test/fixtures/' + fixture]);
  } else {
    loadFixtures(fixture);
  }
}