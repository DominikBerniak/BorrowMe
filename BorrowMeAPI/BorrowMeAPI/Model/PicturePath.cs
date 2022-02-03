namespace BorrowMeAPI.Model
{
    public class PicturePath
    {
        public string DirectoryName { get; set; }
        public string FileName { get; set; }

        public PicturePath(string directoryName, string fileName)
        {
            DirectoryName = directoryName;
            FileName = fileName;
        }
    }
}
