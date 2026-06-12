declare module "react-simple-maps" {
    import { ComponentType, SVGProps, MouseEvent } from "react";

    interface ProjectionConfig {
        scale?: number;
        center?: [number, number];
        rotate?: [number, number, number];
    }

    interface ComposableMapProps {
        projection?: string;
        projectionConfig?: ProjectionConfig;
        width?: number;
        height?: number;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }

    interface ZoomableGroupProps {
        zoom?: number;
        center?: [number, number];
        minZoom?: number;
        maxZoom?: number;
        onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
        children?: React.ReactNode;
    }

    interface GeographyProps extends SVGProps<SVGPathElement> {
        geography: object;
        style?: {
            default?: SVGProps<SVGPathElement> & { outline?: string; cursor?: string };
            hover?: SVGProps<SVGPathElement> & { outline?: string; cursor?: string };
            pressed?: SVGProps<SVGPathElement> & { outline?: string; cursor?: string };
        };
        onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
        onMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
        onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
        onClick?: (event: MouseEvent<SVGPathElement>) => void;
    }

    interface GeographiesProps {
        geography: string | object;
        children: (props: { geographies: GeoFeature[] }) => React.ReactNode;
    }

    interface GeoFeature {
        rsmKey: string;
        properties: Record<string, unknown>;
        [key: string]: unknown;
    }

    export const ComposableMap: ComponentType<ComposableMapProps>;
    export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
    export const Geographies: ComponentType<GeographiesProps>;
    export const Geography: ComponentType<GeographyProps>;
}
