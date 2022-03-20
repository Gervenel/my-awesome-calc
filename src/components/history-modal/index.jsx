import React from 'react'
import {Modal} from 'antd'

export default function HistoryModal({history, visible, hide}) {
    return (
        <Modal title="История операций" visible={visible} onCancel={hide} footer={null}>
            <div>
                {history.map((operation, i) => <span key={i} dangerouslySetInnerHTML={{__html: operation}} />)}
            </div>
        </Modal>
    )
}
