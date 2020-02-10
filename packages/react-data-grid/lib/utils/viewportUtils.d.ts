import { ColumnMetrics } from '../common/types';
export declare function getVerticalRangeToRender(height: number, rowHeight: number, scrollTop: number, rowsCount: number, renderBatchSize: number): readonly [number, number];
export interface HorizontalRangeToRender {
    colVisibleStartIdx: number;
    colVisibleEndIdx: number;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
}
export interface HorizontalRangeToRenderParams<R> {
    columnMetrics: ColumnMetrics<R>;
    scrollLeft: number;
}
export declare function getHorizontalRangeToRender<R>({ columnMetrics, scrollLeft }: HorizontalRangeToRenderParams<R>): HorizontalRangeToRender;
