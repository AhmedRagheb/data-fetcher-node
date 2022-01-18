/**
 * A class that acts as a wrapper around global settings, configuration and constants.
 */
export default class Settings {
  /**
   * The default port the server will listen on, if no other is configured.
   */
  public static DEFAULT_PORT = 8080;

  /**
   * The port the web server should listen on.
   */
  static get port(): number {
    const port = process.env['PORT'];
    return port ? parseInt(port) : this.DEFAULT_PORT;
  }

  static get connnectionstring(): string {
    return process.env['MONGO_SERVER'] || '';
  }
}
