const BorrowList = require('../models/Borrow');
const Books = require('../models/Book');

exports.BorrowBook = async (req, res) => {
    try {
        // Tìm kiếm lần mượn sách cuối  
        const lastBorrow = await BorrowList.findOne({
            user_id: req.body.user_id,
            book_id: req.body.book_id,
        }).sort({ borrow_date: -1 });


        const newTurn = lastBorrow ? lastBorrow.turn + 1 : 1;

        // Tạo bản ghi mượn sách trong BorrowList
        const borrowBook = await BorrowList.create(req.body);
        // Giảm số lượng sách còn lại bằng cách cập nhật sách trong Books
        await Books.findOneAndUpdate(
            { idBook: borrowBook.book_id },
            { $inc: { remaining: -1 } }
        );

        // Cập nhật lần mượn cùng loại sách
        await BorrowList.findOneAndUpdate(
            { user_id: req.body.user_id, book_id: req.body.book_id },
            { $set: { turn: newTurn } }, 
            { sort: { borrow_date: -1 }, new: true }
        );

        res.status(200).send({ borrowBook});
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.ReturnBook = async (req, res) => {
    try {
        const borrowBook = await BorrowList.findOneAndUpdate(
            { book_id: req.body.book_id, user_id: req.body.user_id, turn: req.body.turn}, 
            {$set: {status: "Returned", return_date: Date.now()}},
            {new: true}
        )
        if (!borrowBook) {
            return res.status(404).send('Book not found in borrow list');
        }
        await Books.findOneAndUpdate(
            { idBook: borrowBook.book_id },
            { $inc: { remaining: 1 } }) 
            res.status(200).send('Book returned successfully');
    }catch (err) {
        res.status(500).send(err.message);
    }
}

exports.ViewHistory = async (req, res) => {
    try {
        // Tìm danh sách mượn sách dựa vào id user được truyền vào
        const borrowList = await BorrowList.find({user_id: req.params.id});

        // Dùng Promise.all để chờ tất cả các truy vấn Books.findOne hoàn tất
        const allBookBorrow = await Promise.all(
            borrowList.map(async (item) => {
                // Tìm sách có idBook khớp với sách trong danh sách mượn
                const book = await Books.findOne({ idBook: item.book_id });
                return {
                    idBook: book.idBook,
                    bookName: book.bookName,
                    turn: item.turn,
                    status: item.status,
                    borrow_date: item.borrow_date,
                    return_date: item.return_date,
                }
            })
        );

        // Trả về danh sách các sách đã mượn
        res.send(allBookBorrow);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.viewAllUserHistory = async (req, res) => {
    try {
        const borrowList = await BorrowList.find();
        res.status(200).json(borrowList);    
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.ExtendLoan = async (req, res) => {
    try {
        const borrowBookDoc = await BorrowList.findOne({user_id: req.body.user_id, book_id: req.body.book_id, turn: req.body.turn });
        
        if (!borrowBookDoc) {
            return res.status(404).send('Sách không tồn tại trong danh sách mượn');
        }
        const newReturnDate = new Date(borrowBookDoc.return_date);
        // Cộng thêm 7 ngày
        newReturnDate.setDate(newReturnDate.getDate() + 7); 

        // Cập nhật lại return_date
        await BorrowList.findOneAndUpdate(
            { book_id: req.body.book_id,
              status: 'Borrowed',
              turn: req.body.turn,  
            },
            { $set: { return_date: newReturnDate } },
            { new: true }
        )
        res.status(200).send(`Ngày trả sách được gia hạn thêm 7 ngày, ngày mới: ${newReturnDate}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

