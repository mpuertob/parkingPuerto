import { Platform } from "@ionic/angular";

export class PlatformMocks extends Platform {
  ready(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve("Plataforma lista");
    });
  }
}
