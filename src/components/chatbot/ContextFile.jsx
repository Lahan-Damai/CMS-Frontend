import styles from './ContextFile.module.css';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
    getContextDocument, 
    postFileToGoogleCloudStorage, 
    insertAllContextFileToVectorDatabase, 
    deleteAllContextFile 
} from '../../services/chatbot'; 

const ContextFile = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [contextFiles, setContextFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.row}`) && !event.target.closest(`.${styles.buttons}`)) {
            setSelectedRow(null);
        }
    };

    const handleTambahFile = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]); // Set the selected file
    };

    const handleFileNameChange = (e) => {
        setFileName(e.target.value); // Set the entered file name
    };

    const handleSubmitFile = async () => {
        try {
            await postFileToGoogleCloudStorage(file, fileName);
            alert('File uploaded successfully!');
            handleCloseModal();
            fetchContextDocuments(); // Refresh the document list
        } catch (error) {
            console.error("File upload failed", error);
        }
    };

    const fetchContextDocuments = async () => {
        try {
            const response = await getContextDocument();
            setContextFiles(response.data);
        } catch (error) {
            console.error("Failed to fetch context documents", error);
        }
    };

    const handleInsertAllToVDB = async () => {
        try {
            await insertAllContextFileToVectorDatabase();
            alert('All files have been inserted into VDB!');
        } catch (error) {
            console.error("Error inserting files to VDB", error);
        }
    };

    const handleHapus = () => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteAllContextFile();
            alert('All context files deleted successfully!');
            setIsDeleteModalOpen(false);
            fetchContextDocuments();
        } catch (error) {
            console.error("Error deleting files", error);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        fetchContextDocuments(); // Fetch documents on component load

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.upper}>
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="cari nama file..." />
                    </div>
                    <div className={styles.buttons}>
                        <button type="button" id={styles.hapusBtn} onClick={handleHapus}>Hapus</button>
                        <button type="button" id={styles.unduhBtn} style={{ display: selectedRow !== null ? 'block' : 'none' }}>Unduh</button>
                        <button type="button" id={styles.tambahBtn} onClick={handleTambahFile}>Tambah File</button>
                        <button type="button" id={styles.tambahVDBBtn} onClick={handleInsertAllToVDB}>Tambah ke VDB</button>
                    </div>
                </div>
                <div className={styles.tabel}>
                    <div className={styles.header}>
                        <p>Nama File</p>
                        <p>Nama Undang-Undang</p>
                        <p>Status</p>
                    </div>
                    <div className={styles.tdContainer}>
                        <div className={styles.tableData}>
                            {contextFiles.map((file, index) => (
                                <div
                                    key={file.id}
                                    className={`${styles.row} ${selectedRow === index ? styles.clicked : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <p>{file.url.split('/').pop()}</p>
                                    <p>{file.uu_name}</p>
                                    <p>{file.is_inserted ? "Aktif" : "Nonaktif"}</p>
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
                            <h2>Tambah File</h2>
                            <div className={styles.inputForm}>
                                <label htmlFor="file">File:</label>
                                <input type="file" id="file" onChange={handleFileUpload} />
                                <label htmlFor="namaUU">Nama undang-undang:</label>
                                <input type="text" name="namaUU" onChange={handleFileNameChange} />
                                <button type="submit" className={styles.submitBtn} onClick={handleSubmitFile}>Submit</button>
                            </div>
                            <button onClick={handleCloseModal} className={styles.closeBtn}>Close</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {isDeleteModalOpen && createPortal(
                <div className={styles.modalBg}>
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>Konfirmasi Hapus</h2>
                            <p>Apakah Anda yakin ingin menghapus semua konteks file?</p>
                            <div className={styles.modalButtons}>
                                <button id={styles.deleteBtn} onClick={handleConfirmDelete}>Ya</button>
                                <button onClick={handleCancelDelete}>Tidak</button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export default ContextFile;
