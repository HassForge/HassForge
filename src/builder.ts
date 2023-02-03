import { RoomBuilder } from "./room-builder";
import { snakeCase } from "change-case";
import { stringify } from "yaml";
import path from "path";
import { writeFileSync, mkdirSync } from "fs";
import { Package } from "./types";

export class HassBuilder {
  builders: RoomBuilder[] = [];

  addRoomBuilder(builder: RoomBuilder) {
    this.builders.push(builder);
    return this;
  }

  private getPackageOutputs(): { [fileName: string]: Package } {
    return this.builders.reduce<{ [fileName: string]: Package }>(
      (prev, roomBuilder, i) => ({
        ...prev,
        [`${snakeCase(`${i}_${roomBuilder.name}`)}`]:
          roomBuilder.buildBackend(),
      }),
      {}
    );
  }

  writePackages(directory: string) {
    try {
      mkdirSync(directory);
    } catch (error) {
      console.error(error);
    }
    const packages = this.getPackageOutputs();
    Object.entries(packages).forEach(([fileName, hassPackage]) =>
      writeFileSync(path.join(directory, `${fileName}.yaml`), stringify(hassPackage))
    );
  }
}
