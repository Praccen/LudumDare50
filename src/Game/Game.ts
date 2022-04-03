class Game {
    private gl: WebGL2RenderingContext;
    private rendering: Rendering;
    private ecsManager: ECSManager;

    private playerEntity: Entity;
    private bombEntity: Entity;


    constructor(gl: WebGL2RenderingContext, rendering: Rendering, ecsManager: ECSManager) {
        this.gl = gl;
        this.rendering = rendering;
        this.ecsManager = ecsManager;

        this.rendering.camera.setZoom(0.2);
        this.rendering.useCrt = false;

        this.playerEntity = this.createPlayerEntity();
        this.bombEntity = this.createBomb();
    }

    createPlayerEntity(): Entity {
        let entity = this.ecsManager.createEntity();
        this.ecsManager.addComponent(entity, new PlayerComponent());
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile(
            "Assets/Textures/Character/Character.png"
        );
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent();
        pc.scale.xy = new Vec2(1.0, 1.5);
        this.ecsManager.addComponent(entity, pc);
        this.ecsManager.addComponent(entity, new InputComponent());
        this.ecsManager.addComponent(entity, new MovementComponent());
        this.ecsManager.addComponent(
            entity,
            new CameraFocusComponent(this.rendering.camera)
        );
        let cc = new CollisionComponent();
        cc.shape.clearVertices();
        cc.shape.addVertex(new Vec2(-0.3, 0.45));
        cc.shape.addVertex(new Vec2(-0.3, -0.5));
        cc.shape.addVertex(new Vec2(0.3, -0.5));
        cc.shape.addVertex(new Vec2(0.3, 0.45));
        this.ecsManager.addComponent(entity, cc);
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(4, 4);
        ac.startingTile = {x: 0, y: 3};
        ac.advanceBy = {x: 1.0, y: 0.0};
        ac.modAdvancement = {x: 2.0, y: 1.0};
        ac.updateInterval = 0.7;
        this.ecsManager.addComponent(entity, ac);

        return entity;
    }

    createBomb(): Entity {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("Assets/Textures/Items/Bomb.png")
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent(0.0, 4.0);
        this.ecsManager.addComponent(entity, pc);
        let mc = new MovementComponent();
        mc.defaultDrag = 0.4;
        this.ecsManager.addComponent(entity, mc);
        let cc = new CollisionComponent(4.0);
        cc.shape.clearVertices();
        cc.shape.addVertex(new Vec2(-0.4, 0.4));
        cc.shape.addVertex(new Vec2(-0.4, -0.5));
        cc.shape.addVertex(new Vec2(0.4, -0.5));
        cc.shape.addVertex(new Vec2(0.4, 0.4));
        cc.bounceFactor = 1.0;
        this.ecsManager.addComponent(entity, cc);
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(3, 4.01); // 3.01 to avoid bomb above in sprite map being slightly visible
        ac.startingTile = {x: 0, y: 1};
        ac.advanceBy = {x: 1.0, y: 0.0};
        ac.modAdvancement = {x: 3.0, y: 1.0};
        ac.updateInterval = 0.05;
        this.ecsManager.addComponent(entity, ac);
        this.ecsManager.addComponent(entity, new BombComponent());
        return entity;
    }
    update(dt: number) {
        
    }
}
