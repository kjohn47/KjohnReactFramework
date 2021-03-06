import React from "react";
import Row from "../../structure/Row";
import Column from "../../structure/Column";
import PageSelector from "../../inputs/PageSelector";
import WithTooltip, { ToolTipColor, ToolTipPosition } from "../wrapper/WithTooltip";
import useTranslation from "../../../../logic/functions/getTranslation";
import { IDictionary, PageType } from "../../../../logic/functions/misc";

export interface ITableCell {
    page?: PageType;
    query?: IDictionary<string>;
    onClick?: () => void;
    text: string;
    toolTip?: string;
    toolTipColor?: ToolTipColor;
    onClickEdit?: () => void;
    onClickRemove?: () => void;
}

export interface ITableContent {
    title?: string;
    header?: string[];
    rows: Array<ITableCell[]>;
    highlightRows?: boolean;
    hideScroll?: boolean;
}

const Table: React.FC<ITableContent> = ( props ) => {

    const { getTranslation } = useTranslation();

    const renderTableHeader: ( header: string[] ) => any = ( header ) => {
        return (
            <div className="TableRow TableHeader" >
                {
                    header.map( ( val, i ) =>
                        <div className={ "TableHeaderCell TableHeaderCellColor" } key={ i }>{ val }</div>
                    )
                }
            </div>
        );
    }

    const renderTableCells: ( cells: ITableCell[] ) => any = ( cells ) => {
        return (
            cells.map( ( cell, i ) => {
                let cellText = cell.page ? <PageSelector highlight page={ cell.page } queryParams={ cell.query }>{ cell.text }</PageSelector> : <span>{ cell.text }</span>;
                return (
                    <div className={ "TableCell" + ( cell.onClick !== undefined ? " TableCell_Clickable" : "" ) } key={ i } onClick={ cell.onClick } >
                        <div className="TableCellRow">
                            <div className={ ( cell.onClickEdit !== undefined || cell.onClickRemove !== undefined ) ? "TableCell_EditRemove_left" : "TableCellData" } >
                                {
                                    cell.toolTip ?
                                        <WithTooltip className="Table_Tooltip" toolTipText={ cell.toolTip } toolTipColor={ cell.toolTipColor } toolTipPosition={ ToolTipPosition.Bottom }>
                                            { cellText }
                                        </WithTooltip>
                                        :
                                        cellText
                                }
                            </div>
                            {
                                ( cell.onClickEdit !== undefined || cell.onClickRemove !== undefined ) &&
                                <div className="TableCell_EditRemove_right">
                                    <div className="TableCellEditRemoveRow">
                                        { cell.onClickEdit && <div className="TableCell_Clickable TableCellEditRemoveField" onClick={ cell.onClickEdit }>{ getTranslation( "_tableText", "#(edit)" ) }</div> }
                                        { cell.onClickRemove && <div className="TableCell_Clickable TableCellEditRemoveField TableRemoveField" onClick={ cell.onClickRemove }>{ getTranslation( "_tableText", "#(remove)" ) }</div> }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                );
            } )
        );
    }

    const renderTableRows: ( rows: Array<ITableCell[]> ) => any = ( rows ) => {
        return (
            rows.map( ( row, i ) =>
                <div className={ "TableRow" + ( props.highlightRows ? " TableRowHighlight" : "" ) } key={ i } >
                    { renderTableCells( row ) }
                </div>
            )
        )
    }

    return (
        <div className={ "TableDiv KRFScroll" + (props.hideScroll ? " TableDiv_HideScroll" : "")}>
            { props.title &&
                <Row>
                    <Column>
                        <div className="TableTitle">{ props.title }</div>
                    </Column>
                </Row> }
            <Row>
                <Column>
                    <div className="TableContent">
                        { props.header && renderTableHeader( props.header ) }
                        { renderTableRows( props.rows ) }
                    </div>
                </Column>
            </Row>
        </div>
    );
}

export default Table;