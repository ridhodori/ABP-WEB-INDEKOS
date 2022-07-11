--
-- Dumping data for table `electricity`
--

INSERT INTO `electricity` (`id`, `payment_id`, `payment_status`, `electric_price`, `electricity_payed`, `electricity_periode`) VALUES
('cl50vdys715964ga10timq9bj', 'cl50upio50686tga138654hcb', 0, 50000, 0, 'Januari'),
('cl50vehmk16754ga1czyen99r', 'cl50uxkk101674ga1m2vlim93', 0, 55000, 0, 'Februari'),
('cl50vf07t17544ga1uqw5fc5c', 'cl50upio60689tga1s3bdw8r8', 0, 50000, 0, 'Januari'),
('cl50vfhj618334ga1klyy776d', 'cl50upio80693tga1w2rkc9yk', 0, 50000, 0, 'Februari'),
('cl50vfhj618354ga1qfmq0whd', 'cl50uxwn402404ga1st4dh5rg', 0, 60000, 0, 'Januari');

-- --------------------------------------------------------

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `user_id`) VALUES
('cl50upio50686tga138654hcb', 'cl4zgvnuj0006hwa1mb22avkn'),
('cl50uxkk101674ga1m2vlim93', 'cl4zgvnuj0006hwa1mb22avkn'),
('cl50upio60689tga1s3bdw8r8', 'cl4zh8oe50027hwa1sgnuf3nm'),
('cl50uxwn402404ga1st4dh5rg', 'cl4zh8oe50027hwa1sgnuf3nm'),
('cl50upio80693tga1w2rkc9yk', 'cl4zlm1lc0144hoa1f8epuhq0');

-- --------------------------------------------------------

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`id`, `payment_id`, `payment_status`, `rent_periode`, `rent_prices`, `rent_payed`) VALUES
('cl50uq2vq0908tga19ef46x5t', 'cl50upio50686tga138654hcb', 0, 'Januari', 700000, 0),
('cl50uyfz603564ga1b5py4jwj', 'cl50uxkk101674ga1m2vlim93', 0, 'Februari', 700000, 0),
('cl50uzjo004564ga1ar17jv6w', 'cl50upio60689tga1s3bdw8r8', 0, 'Januari', 700000, 0),
('cl50uzvp305354ga1lrxwnqkv', 'cl50uxwn402404ga1st4dh5rg', 0, 'Februari', 700000, 0),
('cl50v06qf06144ga1c5xjz58i', 'cl50upio80693tga1w2rkc9yk', 0, 'Januari', 700000, 0);

-- --------------------------------------------------------

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `image`, `emailVerified`, `user_status`, `address`, `phone_num`) VALUES
('cl4zgvnuj0006hwa1mb22avkn', 'asd', '$2b$10$iW.yN9drAWYiAJDj89eFUum3IOPGdkJOKFhyvlqbDgnc9vEcnInaa', 'asd name', 'asd@asd.com', NULL, NULL, 1, 'jl asd', 123),
('cl4zh8oe50027hwa1sgnuf3nm', 'werty', '$2b$10$7JUBfH3MFoNICnADGOr0DOyjQSLsMDaF2OSf1II5ZeQVZo6RihDZO', 'werty name', 'werty@wer.ty', NULL, NULL, 1, 'jl werty', 1234),
('cl4zlm1lc0144hoa1f8epuhq0', 'asd2', '$2b$10$ivieS8oaS40n/a4/cU97UuKYFxEd6tgJQTe1X8AdJEKtx3sXkcH1m', 'asd2 name', 'asd2@asd2.com', NULL, NULL, 1, 'jl asd2', 12345);

-- --------------------------------------------------------

--
-- Dumping data for table `water`
--

INSERT INTO `water` (`id`, `payment_id`, `payment_status`, `water_price`, `water_payed`, `water_periode`) VALUES
('cl50v5yu507844ga1tc1cd9gt', 'cl50upio50686tga138654hcb', 0, 120000, 0, 'Januari'),
('cl50v7p9b09984ga1zt5f8alg', 'cl50uxkk101674ga1m2vlim93', 0, 100000, 0, 'Februari'),
('cl50v87he10774ga1xh0efckq', 'cl50upio60689tga1s3bdw8r8', 0, 50000, 0, 'Januari'),
('cl50v8orv11564ga17gpoo2xs', 'cl50uxwn402404ga1st4dh5rg', 0, 80000, 0, 'Februari'),
('cl50v9ddy12354ga1wiz1yi7s', 'cl50upio80693tga1w2rkc9yk', 0, 70000, 0, 'Januari');

-- --------------------------------------------------------
