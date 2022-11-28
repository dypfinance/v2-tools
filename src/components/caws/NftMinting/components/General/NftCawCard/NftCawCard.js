import React from 'react'
import PropTypes from "prop-types"
import SvgEyeIcon from './SvgEyeIcon'
import './_nftCawCard.scss'

const NftCawCard = ({ modalId, action, nft }) => {
    if (!nft) {
        return null;
    }
    return (
        <>
            <div className="nft-caw-card" data-toggle="modal" data-target={modalId} onClick={() => { action(nft) }} >
                <div className="elevated-container">
                    <img src={nft.image.replace('images', 'thumbs')} className="nft-img" alt="" />
                    <p>
                        CAWS
                    </p>
                    <div className="footer">
                        <p className="nft-id">
                            #{String(nft.name).replace('CAWS #', '')}
                        </p>
                        <div className="img">

                            <SvgEyeIcon />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
NftCawCard.propTypes = {
    modalId: PropTypes.string,
    action: PropTypes.func,
    nft: PropTypes.object
}

export default NftCawCard