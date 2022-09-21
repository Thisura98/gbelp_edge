import { UtilsService } from "../utils.service"

describe('UtilsService', () => {

  let service: UtilsService;
  beforeEach(() => { service = new UtilsService(); });

  it('urlFromPath works', () => {
    const path = '/dashboard/games';
    const domain = 'localhost';
    const port = '9876';
    const result = service.urlFromPath(path, domain, port);
    const url = 'http://localhost:9876/dashboard/games';
    expect(result).toBe(url);
  })

})