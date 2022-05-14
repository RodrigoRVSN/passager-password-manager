/** 
 * This file is part of Passager Password Manager.
 * https://github.com/oegea/passager-password-manager
 * 
 * Copyright (C) 2022 Oriol Egea Carvajal
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Third party dependencies
import React, {useRef} from 'react';
import styled from 'styled-components';

// Molecules
import SectionTitle from '../../molecules/SectionTitle/index.js';
// Hooks
import useTranslation from '../../../hooks/useTranslation/index.js';
// Own libs
import {downloadBackup} from '../../../libs/backups.js';

const FileSelector = styled.input`
    display: none;
`;

const UserDetailsRightPanel = () => {
    const { t } = useTranslation();
    const uploadBackupRef = useRef(null);

    if (localStorage.getItem('storeMode') !== 'LOCAL'){
        return (<>
            <SectionTitle title={t('profile.Backups')} buttons={[]}/>
            <p>{t('profile.This feature is only available when passwords are stored locally')}</p>
        </>)
    }

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result);
          loadBackup(text);
        };
        reader.readAsText(e.target.files[0])
    }

    const loadBackup = (backupData) => {
        const backup = JSON.parse(backupData);
        localStorage.clear();
        //Each key of the backup should be setted into localStorage
        for (const key in backup) {
            if (backup.hasOwnProperty(key)) {
                localStorage.setItem(key, backup[key]);
            }
        }
        window.location.reload();
    }

    return (
        <>
            <SectionTitle title={t('profile.Backups')} buttons={[
                {label: t('profile.Download Backup'), onClick: () => downloadBackup()},
                {label: t('profile.Import Backup'), onClick: () => uploadBackupRef.current.click()},
            ]}/>

            <FileSelector ref={uploadBackupRef} type="file" onChange={(e) => showFile(e)} />

            <p>{t('profile.When you store your passwords locally, they are saved in the local storage of your Internet browser')}</p>
            <p>{t('profile.There are certain browser cleaning operations that may delete this information, and may cause you to lose your passwords')}</p>
            <p>{t('profile.It is therefore recommended to regularly download backups via this page and store them on a secure storage device')}</p>
            <p><strong>{t('profile.In case you accidentally delete your data, you can upload a backup copy by clicking on the "Import backup copy" button')}</strong></p>
            <p>{t('profile.In addition, you can upload your backups to other computers to have your passwords available on different devices')}</p>
            
        </>
    )
}

UserDetailsRightPanel.displayName = 'UserDetailsRightPanel';
UserDetailsRightPanel.propTypes = {
}

export default UserDetailsRightPanel;