import styles from './ContextFile.module.css';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ContextFile  = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.row}`) && !event.target.closest(`.${styles.buttons}`)) {
            setSelectedRow(null);
        }
        // if (!event.target.closest(`.${styles.modal}`)) {
        //     setIsModalOpen(false);
        // }
    }

    const handleTambahFile = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
    <div className={styles.body}>
        <div className={styles.container}>
            <div className={styles.upper}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="cari nama file..."/>
                </div>
                <div class={styles.buttons}>
                    <button type="button" id={styles.hapusBtn} style={{display: selectedRow !== null ? 'block' : 'none'}}>Hapus</button>
                    <button type="button" id={styles.unduhBtn} style={{display: selectedRow !== null ? 'block' : 'none'}}>Unduh</button>
                    <button type="button" id={styles.tambahBtn} onClick={handleTambahFile}>Tambah File</button>
                </div>
            </div>
            <div className={styles.tabel}>
                <div className={styles.header}>
                    <p>Nama File</p>
                    <p>Nama Undang-Undang</p>
                </div>
                <div className={styles.tdContainer}>
                    <div className={styles.tableData}>
                        {['UU_05_1960.pdf', 'UU_05_1960.pdf', 'asdf', 'asdf'].map((file, index) => (
                            <div
                                key={index}
                                className={`${styles.row} ${selectedRow === index ? styles.clicked : ''}`}
                                onClick={() => handleRowClick(index)}
                            >
                                <p>{file}</p>
                                <p>undang-undang no 5 tahun 1960</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {isModalOpen && createPortal(
            <div className={styles.modalBg}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.inputForm}>
                            <label htmlFor="file">File:</label> 
                            <input type="file" id="file" />
                            <button type="submit">Submit</button>
                        </div>
                        <button onClick={handleCloseModal} className={styles.closeBtn}>Close</button>
                    </div>
                </div>
            </div>,
            document.body
        )}
    </div>
    )
}

export default ContextFile