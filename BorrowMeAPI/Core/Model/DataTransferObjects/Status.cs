namespace Core.Model.DataTransferObjects
{
    public enum Status
    {
        Ok,
        Created,
        NotFound,
        BadRequest
    }
    public enum AuthenticationStatus
    {
        LoggedIn,
        Unauthorized,
        EmailNotConfirmed
    }
}
