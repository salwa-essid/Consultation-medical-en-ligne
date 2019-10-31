 class User{
        constructor(){
            this.Id = ""
            this.Firstname = "",
            this.Lastname = "",
            this.Birth = "",
            this.Address = "",
            this.Role ="",
            this.Password ="",
            this.Email = "",
            this.Phone = "",
            this.isActive = "",
            this.Diploma ="",
            this.CreatedAt = new Date(),
            this.UpdatedAt =  new Date()
        }
    }
module.exports = User;