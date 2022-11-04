import { EntityManager } from 'typeorm';
import * as E from '../entities';

export const saveCartAndWishList = async (manager: EntityManager, user: E.User): Promise<void> => {
  const cart = new E.Cart();
  const wishList = new E.Wishlist();

  cart.userId = user.id;
  wishList.userId = user.id;

  await manager.save([cart, wishList]);
};

export const saveLand = async (manager: EntityManager, user: E.User): Promise<void> => {
  const land1 = new E.Land();
  land1.unityLandId = 1;
  land1.landPositionX = -27.440000534057618;
  land1.landPositionY = -0.47999998927116396;
  land1.landPositionZ = 27.440000534057618;
  land1.landScaleX = 2.5;
  land1.landScaleY = 2.499999523162842;
  land1.landScaleZ = 2.499999523162842;
  land1.landEulerAngleX = 270.0;
  land1.landEulerAngleY = 45.0;
  land1.landEulerAngleZ = 0.0;
  land1.userId = user.id;

  const land2 = new E.Land();
  land2.unityLandId = 2;
  land2.landPositionX = 28.81999969482422;
  land2.landPositionY = -0.2199999988079071;
  land2.landPositionZ = 25.040000915527345;
  land2.landScaleX = 2.5;
  land2.landScaleY = 2.499999523162842;
  land2.landScaleZ = 2.499999523162842;
  land2.landEulerAngleX = 270.0;
  land2.landEulerAngleY = 45.0;
  land2.landEulerAngleZ = 0.0;
  land2.userId = user.id;

  const land3 = new E.Land();
  land3.unityLandId = 3;
  land3.landPositionX = 0.0;
  land3.landPositionY = 0.0;
  land3.landPositionZ = 0.0;
  land3.landScaleX = 2.5;
  land3.landScaleY = 2.499999523162842;
  land3.landScaleZ = 2.499999523162842;
  land3.landEulerAngleX = 270.0;
  land3.landEulerAngleY = 0.0;
  land3.landEulerAngleZ = 0.0;
  land3.userId = user.id;

  const land4 = new E.Land();
  land4.unityLandId = 4;
  land4.landPositionX = -28.209999084472658;
  land4.landPositionY = -0.10000000149011612;
  land4.landPositionZ = -25.510000228881837;
  land4.landScaleX = 2.5;
  land4.landScaleY = 2.499999523162842;
  land4.landScaleZ = 2.499999523162842;
  land4.landEulerAngleX = 270.0;
  land4.landEulerAngleY = 45.0;
  land4.landEulerAngleZ = 0.0;
  land4.userId = user.id;

  const land5 = new E.Land();
  land5.unityLandId = 5;
  land5.landPositionX = 26.6200008392334;
  land5.landPositionY = -0.2199999988079071;
  land5.landPositionZ = -27.610000610351564;
  land5.landScaleX = 2.5;
  land5.landScaleY = 2.499999523162842;
  land5.landScaleZ = 2.499999523162842;
  land5.landEulerAngleX = 270.0;
  land5.landEulerAngleY = 314.63079833984377;
  land5.landEulerAngleZ = 0.0;
  land5.userId = user.id;

  await manager.save([land1, land2, land3, land4, land5]);
};

export const saveBridge = async (manager: EntityManager, user: E.User): Promise<void> => {
  const bridge1 = new E.Bridge();
  bridge1.name = 'Bridge';
  bridge1.bridgePositionX = -13.670000076293946;
  bridge1.bridgePositionY = -0.1899999976158142;
  bridge1.bridgePositionZ = -14.25;
  bridge1.bridgeRotationX = 0.0;
  bridge1.bridgeRotationY = 44.999996185302737;
  bridge1.bridgeRotationZ = 0.0;
  bridge1.userId = user.id;

  const bridge2 = new E.Bridge();
  bridge2.name = 'Bridge';
  bridge2.bridgePositionX = -14.260000228881836;
  bridge2.bridgePositionY = -0.3700000047683716;
  bridge2.bridgePositionZ = 14.760000228881836;
  bridge2.bridgeRotationX = 0.0;
  bridge2.bridgeRotationY = 315.0;
  bridge2.bridgeRotationZ = 0.0;
  bridge2.userId = user.id;

  const bridge3 = new E.Bridge();
  bridge3.name = 'Bridge';
  bridge3.bridgePositionX = 14.40999984741211;
  bridge3.bridgePositionY = -0.1899999976158142;
  bridge3.bridgePositionZ = 13.8100004196167;
  bridge3.bridgeRotationX = 0.0;
  bridge3.bridgeRotationY = 44.999996185302737;
  bridge3.bridgeRotationZ = 0.0;
  bridge3.userId = user.id;

  const bridge4 = new E.Bridge();
  bridge4.name = 'Bridge';
  bridge4.bridgePositionX = 12.850000381469727;
  bridge4.bridgePositionY = -0.20000000298023225;
  bridge4.bridgePositionZ = -15.149999618530274;
  bridge4.bridgeRotationX = 0.0;
  bridge4.bridgeRotationY = 315.0;
  bridge4.bridgeRotationZ = 0.0;
  bridge4.userId = user.id;

  await manager.save([bridge1, bridge2, bridge3, bridge4]);
};

export const saveBridgeInfo = async (manager: EntityManager): Promise<void> => {
  const bridgeInfo1 = new E.BridgeInfo();
  bridgeInfo1.bridgeId = 1;
  bridgeInfo1.fromLandId = 3;
  bridgeInfo1.toLandId = 4;

  const bridgeInfo2 = new E.BridgeInfo();
  bridgeInfo2.bridgeId = 2;
  bridgeInfo2.fromLandId = 1;
  bridgeInfo2.toLandId = 3;

  const bridgeInfo3 = new E.BridgeInfo();
  bridgeInfo3.bridgeId = 3;
  bridgeInfo3.fromLandId = 2;
  bridgeInfo3.toLandId = 3;

  const bridgeInfo4 = new E.BridgeInfo();
  bridgeInfo4.bridgeId = 4;
  bridgeInfo4.fromLandId = 3;
  bridgeInfo4.toLandId = 5;

  await manager.save([bridgeInfo1, bridgeInfo2, bridgeInfo3, bridgeInfo4]);
};
