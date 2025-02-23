import { Data } from "../type/types";

export const contentData: Data[] = [
    {
        id: 1,
        title: 'fog belt',
        description: 'The Coast Redwood grows only within the summer fog belt of California and southwestern Oregon. There are three small groves in Oregon, the others occur along the coast of California',
        coordinates: '40.1218° N,123.8821° W',
        bgImg: new URL('/images/fog belt/fog_belt.png', import.meta.url).href,
        descriptionImg: new URL('/images/fog belt/fog_belt2.png', import.meta.url).href,
    }, {
        id: 2,
        title: 'mount peak',
        description: 'Big Basin Redwoods State Park, which is further south and known for its rugged terrain and dense redwood forests',
        coordinates: '37.2216° N, 122.2131° W',
        bgImg: new URL('/images/mountain peak/mountain_peak.png', import.meta.url).href,
        descriptionImg: new URL('/images/mountain peak/mountain_peak2.png', import.meta.url).href,
    }, {
        id: 3,
        title: 'two ways',
        description: 'The drive-through tree offers a unique chance to pass your car through the trunk of a giant redwood. It’s a memorable stop for photos and learning about these majestic trees',
        coordinates: '39.8587° N, 123.7190° W',
        bgImg:  new URL('/images/two ways/two_ways.png', import.meta.url).href,
        descriptionImg:  new URL('/images/two ways/two_ways2.png', import.meta.url).href,
    }, {
        id: 4,
        title: 'tallest tree',
        description: 'The tallest tree in the world is Hyperion that stands at an average height of 360 feet (116 meters) tall, with its trunk just over 16 feet (4.94 meters) in diameter',
        coordinates: '41.3676° N, 124.0046° W',
        bgImg:  new URL('/images/tallest tree/tallest_tree.png', import.meta.url).href,
        descriptionImg:  new URL('/images/tallest tree/tallest_tree2.png', import.meta.url).href,
    },
];