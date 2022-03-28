class SpriteMap {
    constructor() {
        this.nrOfSprites = [1.0, 1.0];
        this.currentSprite = [0.0, 0.0];
        this.textureMatrix = new Matrix4(null);
    }
    updateTextureMatrix() {
        this.textureMatrix.setIdentity();
        let spriteSizeX = 1.0 / Math.max(this.nrOfSprites[0], 0.000001);
        let spriteSizeY = 1.0 / Math.max(this.nrOfSprites[1], 0.000001);
        this.textureMatrix.translate(this.currentSprite[0] * spriteSizeX, this.currentSprite[1] * spriteSizeY, 0.0);
        this.textureMatrix.scale(spriteSizeX, spriteSizeY, 1.0);
    }
    setNrOfSprites(x, y) {
        this.nrOfSprites[0] = x;
        this.nrOfSprites[1] = y;
        this.updateTextureMatrix();
    }
    setCurrentSprite(x, y) {
        this.currentSprite[0] = x;
        this.currentSprite[1] = y;
        this.updateTextureMatrix();
    }
    advanceSpriteBy(x, y) {
        this.currentSprite[0] += x;
        this.currentSprite[1] += y;
        this.updateTextureMatrix();
    }
}
;
//# sourceMappingURL=SpriteMap.js.map