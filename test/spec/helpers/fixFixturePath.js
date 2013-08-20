var path = '';
if (typeof window.__karma__ !== 'undefined') {
  path += 'base/'
} else {
  path += '../../';
}
jasmine.getFixtures().fixturesPath = path + 'test/fixtures';
