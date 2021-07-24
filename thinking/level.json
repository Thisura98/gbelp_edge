p={
    _id: ObjectId('60f6e9199c7ba83a08968694'),
    resources: [
        {
            _id: ObjectId('60fc2e8d4962400cb24a0892'),
            displayName: 'mario.png',
            filename: 'fs/res_upload/3d7d44b93a316ea23e3bbfa47d22c8f5',
            type: 'image'
        },
        {
            _id: ObjectId('60fc2e924962400cb24a0893'),
            displayName: 'koopa_1.png',
            filename: 'fs/res_upload/462dcc99ec2861042a26b9c03202c186',
            type: 'image'
        }
    ],
    levels: [
        {
            id: 12345,
            name: 'New Game',
            type: 'single_startup', // type determines whether its locked
            display_mode: 'on_top|replace',
            exit_criteria_type: 'time|score|manual', // extracted from game entry. if that changes, this changes.
            exit_criteria_value: '100|100|null', // time:Seconds, score:points, manual: null
            scene: {
                objects: [
                    {
                        id: 12345,
                        type: 'camera',
                        name: 'Camera',
                        frame: {
                            x: 0, 
                            y: 0,
                            w: 100,
                            h: 100
                        },
                        rotation: 90.0, // in centigrades
                        physics: null,
                        opacity: null,
                        spawn: null,
                        stretch: null, 
                        hidden: false,
                        sprite_id: null
                    },
                    {
                        id: 12346,
                        type: 'sprite',
                        name: 'Mario-1',
                        frame: {
                            x: 20, 
                            y: 120,
                            w: 100,
                            h: 50
                        },
                        rotation: 0.0,
                        physics: 'solid|none',
                        opacity: 1.0,
                        spawn: 'per_level',
                        stretch: 'fit', 
                        hidden: false,
                        sprite_id: 1234
                    },
                    {
                        id: 12347,
                        type: 'text',
                        name: 'Text-1',
                        frame: {
                            x: 20, 
                            y: 120,
                            w: 100,
                            h: 50
                        },
                        rotation: 0.0,
                        physics: null,
                        opacity: 1.0,
                        spawn: 'per_level',
                        stretch: null, 
                        hidden: false,
                        sprite_id: null,
                        text: {
                            value: 'Play Game',
                            color: '#FF0000'
                        }
                    },
                ]
            },
            animations: {
                animations: [
                    {
                        id: 1234,
                        object_id: 1234,
                        name: 'Koopa Left right',
                        duration: 4.0,
                        loop: 'none|once|forever',
                        actions: [
                            {
                                id: 1234,
                                type: 'move_right',
                                duration: 2.0,
                                props: {
                                    length: 100
                                }
                            },
                            {
                                id: 1235,
                                type: 'move_left',
                                duration: 2.0,
                                props: {
                                    length: 100
                                }
                            },
                        ]
                    },
                    {
                        id: 1234,
                        object_id: 1235,
                        name: 'Phase Change',
                        duration: 2.0,
                        loop: 'forever',
                        actions: [
                            {
                                id: 1234,
                                type: 'image_seq',
                                duration: 2.0,
                                props: {
                                    sprite_id: 1234
                                }
                            },
                            {
                                id: 1235,
                                type: 'image_seq',
                                duration: 2.0,
                                props: {
                                    sprite_id: 1234
                                }
                            },
                        ]
                    },
                ]
            },
            logic: {
                nodes: [ // the logic
                    {
                        id: 1234,
                        type: 'game_obj_sprite',
                        inlets: null,
                        outlets: [
                            'reference'
                        ],
                        properties: {
                            sprite_id: 1234
                        }
                    },
                    {
                        id: 1235,
                        type: 'process_platformer',
                        inlets: [
                            'player'
                        ],
                        outlets: [
                            'whenJumped'
                        ],
                        properties: {}
                    },
                    {
                        id: 1236,
                        type: 'event_level_load',
                        inlets: null,
                        outlets: [
                            'link'
                        ],
                        properties: {}
                    },
                ],
                links: [ // the ropes
                    {
                        out_node: 1234,
                        outlet: 'reference',
                        in_node: 1235,
                        inlet: 'player'
                    }
                ]
            }
        }
    ],
    __v: 0
}