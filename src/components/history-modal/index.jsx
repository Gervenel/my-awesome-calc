import React from 'react'
import {Modal, Tag} from 'antd'

import styles from './styles.css'

export default function HistoryModal({history, visible, hide}) {
    return (
        <Modal title="История операций" visible={visible} onCancel={hide} footer={null} centered>
            <div className='tagsWrapper'>
                {history.map((operation, i) =>
                    <Tag key={i} className='tag'>
                        <span className='text' dangerouslySetInnerHTML={{__html: operation}} />
                    </Tag>
                )}
            </div>
        </Modal>
    )
}
