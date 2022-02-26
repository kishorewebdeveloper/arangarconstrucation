using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Reflection;

namespace Common.CustomDataAnnotationsValidations
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public sealed class RequiredIfAttribute : ValidationAttribute
    {
        public string OtherProperty { get; }

        public string OtherPropertyDisplayName { get; set; }

        public object OtherPropertyValue { get; }

        public bool IsInverted { get; set; }

        public override bool RequiresValidationContext => true;


        public RequiredIfAttribute(string otherProperty, object otherPropertyValue) : base("'{0}' is required because '{1}' has a value {3}'{2}'.")
        {
            OtherProperty = otherProperty;
            OtherPropertyValue = otherPropertyValue;
            IsInverted = false;
        }
        
 
        public override string FormatErrorMessage(string name)
        {
            return string.Format(CultureInfo.CurrentCulture, ErrorMessageString, name,
                OtherPropertyDisplayName ?? OtherProperty, OtherPropertyValue, IsInverted ? "other than " : "of ");
        }
        
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (validationContext == null)
            {
                throw new ArgumentNullException(@"validationContext");
            }

            PropertyInfo otherProperty = validationContext.ObjectType.GetProperty(OtherProperty);
            if (otherProperty == null)
            {
                return new ValidationResult(
                    string.Format(CultureInfo.CurrentCulture, "Could not find a property named '{0}'.", OtherProperty));
            }

            object otherValue = otherProperty.GetValue(validationContext.ObjectInstance);

            // check if this value is actually required and validate it
            if ((IsInverted || !Equals(otherValue, OtherPropertyValue)) && (!IsInverted || Equals(otherValue, OtherPropertyValue))) 
                return ValidationResult.Success;

            return value switch
            {
                null => new ValidationResult(FormatErrorMessage(validationContext.DisplayName)),
                // additional check for strings so they're not empty
                string val when val.Trim().Length == 0 => new ValidationResult(FormatErrorMessage(validationContext.DisplayName)),
                _ => ValidationResult.Success
            };
        }
    }
}
