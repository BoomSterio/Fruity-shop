import React, {useEffect, useState} from 'react'
import s from './ProductPage.module.css'
import {useParams} from 'react-router'
import {db} from '../../firebase'
import {GlassMagnifier} from 'react-image-magnifiers'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import {Backdrop, createStyles} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import CommentsSection from './CommentsSection/CommentsSection'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import Redactor from './Redactor/Redactor'

const StyledTableRow = withStyles((theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow)

const ProductPage = () => {
    const [product, setProduct] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const params = useParams()
    const id = params.id
    const [docId, setDocId] = useState([])

    useEffect(() => {
        const fetchInfo = async () => {
            db
                .collection('products')
                .where('id', '==', Number(id))
                .limit(1)
                .get()
                .then(p => {
                    let prods = []
                    p.forEach((doc) => {
                        prods.push(doc.data())
                        setDocId([...docId, doc.id])
                    })
                    setProduct(prods[0])
                })
        }
        fetchInfo()
    }, [])

    if (!product)
        return <h2>Loading...</h2>  //todo: nice preloader

    return (
        <div className={s.page}>
            <div className={s.info}>
                <GlassMagnifier
                    className={s.image}
                    cursorStyle={'none'}
                    imageSrc={product.imageUrl}
                    imageAlt={product.imageUrl}
                />
                <div className={s.details}>
                    <h3>{product.name}</h3>
                    <p style={{marginBottom: '10px'}}>In Stock: {product.inStock}</p>
                    <TableContainer className={s.specs} component={Paper}>
                        <Table aria-label="customized table">
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell component="th" scope="row">Size: </TableCell>
                                    <TableCell
                                        align="right"> {product.size.width} x {product.size.height} cm</TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell component="th" scope="row">Weight of 1 item:</TableCell>
                                    <TableCell align="right">{product.weight} kg</TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <span onClick={() => setEditMode(true)} className={s.editBtn}>Edit...</span>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={s.modal}
                        open={editMode}
                        onClose={() => setEditMode(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={editMode}>
                            <Redactor docId={docId[0]} {...product}/>
                        </Fade>
                    </Modal>
                </div>
            </div>
            <CommentsSection productId={id}/>
        </div>
    )
}

export default ProductPage
