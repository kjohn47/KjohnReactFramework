import React from 'react'
import Table from '../../../common/Table'
import { ToolTipColor } from '../../../common/WithTooltip'
import { KnownPages } from '../../../../common/context/routeContextEnums'

const TestTable: React.FC = () =>
    <Table
        header={ [ "A", "B", "C" ] }
        title="Test Table 001"
        rows={ [
            [
                { text: "01" },
                { text: "02 AASASDSFSDFS" },
                { text: "03 with a lot of text lalala lorem ipsum and dont say anything", onClickEdit: () => { }, onClickRemove: () => { }, toolTip: "This is a cell with edit", toolTipColor: ToolTipColor.Blue }
            ],
            [
                { text: "04 AASASDSFSDFS" },
                { text: "Link to home", page: KnownPages.Home, toolTip: "This is a cell link", toolTipColor: ToolTipColor.Green },
                { text: "06 AASASDSFSDFS DFSFSDFSDFSFSD" }
            ],
            [
                { text: "07", toolTip: "This is a cell tooltip", toolTipColor: ToolTipColor.Yellow },
                { text: "08" },
                { text: "09 AASASDSFSDFS FDSFSDFDSF", onClickEdit: () => { }, onClickRemove: () => { } }
            ]
        ]
        }
        highlightRows
    />

export default TestTable;