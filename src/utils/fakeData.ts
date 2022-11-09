import { EntityManager } from 'typeorm';
import * as E from '../entities';

export const saveCartAndWishList = async (manager: EntityManager, user: E.User): Promise<void> => {
  const cart = new E.Cart();
  const wishList = new E.Wishlist();

  cart.userId = user.id;
  wishList.userId = user.id;

  await manager.save([cart, wishList]);
};

export const saveLand = async (manager: EntityManager, user: E.User): Promise<E.Land[]> => {
  const land1 = new E.Land();
  land1.unityLandId = 1;
  land1.landPositionX = 0.0;
  land1.landPositionY = 0.0;
  land1.landPositionZ = 0.0;
  land1.landScaleX = 2.5;
  land1.landScaleY = 2.499999523162842;
  land1.landScaleZ = 2.499999523162842;
  land1.landEulerAngleX = 0.5799999833106995;
  land1.landEulerAngleY = 0.5799999833106995;
  land1.landEulerAngleZ = 0.5799999833106995;
  land1.userId = user.id;

  const land2 = new E.Land();
  land2.unityLandId = 2;
  land2.landPositionX = -15.0;
  land2.landPositionY = 0.0;
  land2.landPositionZ = 15.0;
  land2.landScaleX = 0.5799999833106995;
  land2.landScaleY = 0.5799999833106995;
  land2.landScaleZ = 0.5799999833106995;
  land2.landEulerAngleX = 270.0;
  land2.landEulerAngleY = 0.0;
  land2.landEulerAngleZ = 0.0;
  land2.userId = user.id;

  const land3 = new E.Land();
  land3.unityLandId = 3;
  land3.landPositionX = 15.0;
  land3.landPositionY = 0.0;
  land3.landPositionZ = 15.0;
  land3.landScaleX = 0.5799999833106995;
  land3.landScaleY = 0.5799999833106995;
  land3.landScaleZ = 0.5799999833106995;
  land3.landEulerAngleX = 270.0;
  land3.landEulerAngleY = 0.0;
  land3.landEulerAngleZ = 0.0;
  land3.userId = user.id;

  const land4 = new E.Land();
  land4.unityLandId = 4;
  land4.landPositionX = -15.0;
  land4.landPositionY = 0.0;
  land4.landPositionZ = -15.0;
  land4.landScaleX = 0.5799999833106995;
  land4.landScaleY = 0.5799999833106995;
  land4.landScaleZ = 0.5799999833106995;
  land4.landEulerAngleX = 270.0;
  land4.landEulerAngleY = 0.0;
  land4.landEulerAngleZ = 0.0;
  land4.userId = user.id;

  const land5 = new E.Land();
  land5.unityLandId = 5;
  land5.landPositionX = 15.0;
  land5.landPositionY = 0.0;
  land5.landPositionZ = -15.0;
  land5.landScaleX = 0.5799999833106995;
  land5.landScaleY = 0.5799999833106995;
  land5.landScaleZ = 0.5799999833106995;
  land5.landEulerAngleX = 270.0;
  land5.landEulerAngleY = 0.0;
  land5.landEulerAngleZ = 0.0;
  land5.userId = user.id;

  return manager.save([land1, land2, land3, land4, land5]);
};

export const saveLandDecoration = async (
  manager: EntityManager,
  user: E.User,
  lands: E.Land[],
): Promise<E.LandDecoration[]> => {
  const landDecoration1 = new E.LandDecoration();
  landDecoration1.path = 'Object/Portal';
  landDecoration1.localPositionX = 0.0;
  landDecoration1.localPositionY = -1.25;
  landDecoration1.localPositionZ = 3.0999999046325685;
  landDecoration1.localScaleX = 2.847381591796875;
  landDecoration1.localScaleY = 2.6087000370025636;
  landDecoration1.localScaleZ = 5.494443893432617;
  landDecoration1.localEulerAngleX = 0.0;
  landDecoration1.localEulerAngleY = 0.0;
  landDecoration1.localEulerAngleZ = 0.0;
  landDecoration1.landId = lands[0].id;
  landDecoration1.userId = user.id;

  const landDecoration2 = new E.LandDecoration();
  landDecoration2.path = 'Object/Portal';
  landDecoration2.localPositionX = 0.0;
  landDecoration2.localPositionY = -1.25;
  landDecoration2.localPositionZ = 3.0999999046325685;
  landDecoration2.localScaleX = 2.847381591796875;
  landDecoration2.localScaleY = 2.6087000370025636;
  landDecoration2.localScaleZ = 5.494443893432617;
  landDecoration2.localEulerAngleX = 0.0;
  landDecoration2.localEulerAngleY = 0.0;
  landDecoration2.localEulerAngleZ = 0.0;
  landDecoration2.landId = lands[1].id;
  landDecoration2.userId = user.id;

  const landDecoration3 = new E.LandDecoration();
  landDecoration3.path = 'Object/Portal';
  landDecoration3.localPositionX = 0.0;
  landDecoration3.localPositionY = -1.25;
  landDecoration3.localPositionZ = 3.0999999046325685;
  landDecoration3.localScaleX = 2.847381591796875;
  landDecoration3.localScaleY = 2.6087000370025636;
  landDecoration3.localScaleZ = 5.494443893432617;
  landDecoration3.localEulerAngleX = 0.0;
  landDecoration3.localEulerAngleY = 0.0;
  landDecoration3.localEulerAngleZ = 0.0;
  landDecoration3.landId = lands[2].id;
  landDecoration3.userId = user.id;

  const landDecoration4 = new E.LandDecoration();
  landDecoration4.path = 'Object/Portal';
  landDecoration4.localPositionX = 0.0;
  landDecoration4.localPositionY = -1.25;
  landDecoration4.localPositionZ = 3.0999999046325685;
  landDecoration4.localScaleX = 2.847381591796875;
  landDecoration4.localScaleY = 2.6087000370025636;
  landDecoration4.localScaleZ = 5.494443893432617;
  landDecoration4.localEulerAngleX = 0.0;
  landDecoration4.localEulerAngleY = 0.0;
  landDecoration4.localEulerAngleZ = 0.0;
  landDecoration4.landId = lands[3].id;
  landDecoration4.userId = user.id;

  const landDecoration5 = new E.LandDecoration();
  landDecoration5.path = 'Object/Portal';
  landDecoration5.localPositionX = 0.0;
  landDecoration5.localPositionY = -1.25;
  landDecoration5.localPositionZ = 3.0999999046325685;
  landDecoration5.localScaleX = 2.847381591796875;
  landDecoration5.localScaleY = 2.6087000370025636;
  landDecoration5.localScaleZ = 5.494443893432617;
  landDecoration5.localEulerAngleX = 0.0;
  landDecoration5.localEulerAngleY = 0.0;
  landDecoration5.localEulerAngleZ = 0.0;
  landDecoration5.landId = lands[4].id;
  landDecoration5.userId = user.id;

  return manager.save([landDecoration1, landDecoration2, landDecoration3, landDecoration4, landDecoration5]);
};

export const saveBridge = async (manager: EntityManager, user: E.User): Promise<E.Bridge[]> => {
  const bridge1 = new E.Bridge();
  bridge1.name = 'Bridge';
  bridge1.bridgePositionX = -7.300000190734863;
  bridge1.bridgePositionY = 0.10000000149011612;
  bridge1.bridgePositionZ = -7.800000190734863;
  bridge1.bridgeRotationX = 0.0;
  bridge1.bridgeRotationY = 44.999996185302737;
  bridge1.bridgeRotationZ = 0.0;
  bridge1.userId = user.id;

  const bridge2 = new E.Bridge();
  bridge2.name = 'Bridge';
  bridge2.bridgePositionX = 7.860000133514404;
  bridge2.bridgePositionY = 0.09000000357627869;
  bridge2.bridgePositionZ = 7.360000133514404;
  bridge2.bridgeRotationX = 0.0;
  bridge2.bridgeRotationY = 44.999996185302737;
  bridge2.bridgeRotationZ = 0.0;
  bridge2.userId = user.id;

  const bridge3 = new E.Bridge();
  bridge3.name = 'Bridge';
  bridge3.bridgePositionX = -7.829999923706055;
  bridge3.bridgePositionY = 0.20000000298023225;
  bridge3.bridgePositionZ = 7.53000020980835;
  bridge3.bridgeRotationX = 0.0;
  bridge3.bridgeRotationY = 310.1000061035156;
  bridge3.bridgeRotationZ = 0.0;
  bridge3.userId = user.id;

  const bridge4 = new E.Bridge();
  bridge4.name = 'Bridge';
  bridge4.bridgePositionX = 7.409999847412109;
  bridge4.bridgePositionY = 0.20000000298023225;
  bridge4.bridgePositionZ = -7.739999771118164;
  bridge4.bridgeRotationX = 0.0;
  bridge4.bridgeRotationY = 310.1000061035156;
  bridge4.bridgeRotationZ = 0.0;
  bridge4.userId = user.id;

  return manager.save([bridge1, bridge2, bridge3, bridge4]);
};

export const saveBridgeInfo = async (
  manager: EntityManager,
  bridges: E.Bridge[],
  lands: E.Land[],
): Promise<E.BridgeInfo[]> => {
  const bridgeInfo1 = new E.BridgeInfo();
  bridgeInfo1.bridgeId = bridges[0].id;
  bridgeInfo1.fromLandId = lands[0].id;
  bridgeInfo1.toLandId = lands[3].id;

  const bridgeInfo2 = new E.BridgeInfo();
  bridgeInfo2.bridgeId = bridges[1].id;
  bridgeInfo2.fromLandId = lands[0].id;
  bridgeInfo2.toLandId = lands[2].id;

  const bridgeInfo3 = new E.BridgeInfo();
  bridgeInfo3.bridgeId = bridges[2].id;
  bridgeInfo3.fromLandId = lands[0].id;
  bridgeInfo3.toLandId = lands[1].id;

  const bridgeInfo4 = new E.BridgeInfo();
  bridgeInfo4.bridgeId = bridges[3].id;
  bridgeInfo4.fromLandId = lands[0].id;
  bridgeInfo4.toLandId = lands[4].id;

  return manager.save([bridgeInfo1, bridgeInfo2, bridgeInfo3, bridgeInfo4]);
};
